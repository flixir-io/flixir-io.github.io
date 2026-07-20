#!/usr/bin/env node
// One-off migration script: converts the old MkDocs `docs-site/docs/docs/**`
// source into Starlight-compatible markdown under
// `docs-site/src/content/docs/docs/**`.
//
// Handles:
//   1. Dropping the leading `# Title` heading — Starlight already renders
//      the frontmatter `title` as the page's <h1>, so keeping it in the
//      body doubles it up.
//   2. MkDocs admonitions (`!!! type "title"` / `??? type "title"`) ->
//      Starlight asides (`:::type[title]` ... `:::`)
//   3. Relative *.md links -> absolute Starlight routes (no extension,
//      trailing slash, prefixed with /docs/)
//
// Usage: node convert-mkdocs-content.mjs [--src <dir>] [--out <dir>]

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const args = { src: null, out: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--src') args.src = argv[++i];
    if (argv[i] === '--out') args.out = argv[++i];
  }
  return args;
}

const cliArgs = parseArgs(process.argv.slice(2));
const SRC_ROOT = path.resolve(cliArgs.src ?? path.join(__dirname, 'docs', 'docs'));
const OUT_ROOT = path.resolve(cliArgs.out ?? path.join(__dirname, 'src', 'content', 'docs', 'docs'));

// MkDocs admonition type -> Starlight aside type.
// Starlight only ships note/tip/caution/danger; anything else maps onto
// the closest of those four.
const ADMONITION_MAP = {
  note: 'note',
  info: 'note',
  abstract: 'note',
  summary: 'note',
  tldr: 'note',
  question: 'tip',
  help: 'tip',
  faq: 'tip',
  tip: 'tip',
  hint: 'tip',
  important: 'tip',
  success: 'tip',
  check: 'tip',
  done: 'tip',
  warning: 'caution',
  caution: 'caution',
  attention: 'caution',
  danger: 'danger',
  error: 'danger',
  failure: 'danger',
  fail: 'danger',
  missing: 'danger',
  bug: 'danger',
  example: 'note',
  quote: 'note',
  cite: 'note',
};

async function findMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(full)));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

// Removes the first `# Heading` line right after the frontmatter block.
// Starlight renders `title` from frontmatter as the page's own <h1>, so a
// duplicate `# Title` in the body renders the title twice on every page.
function stripLeadingHeading(content) {
  const fmMatch = content.match(/^---\n[\s\S]*?\n---\n/);
  if (!fmMatch) return content;

  const frontmatter = fmMatch[0];
  let rest = content.slice(frontmatter.length).replace(/^\n+/, '');

  const h1Match = rest.match(/^#\s+.*\n?/);
  if (!h1Match) return content;

  rest = rest.slice(h1Match[0].length).replace(/^\n+/, '');
  return `${frontmatter}\n${rest}`;
}

// Converts MkDocs `!!! type "title"` / `??? type "title"` blocks (content
// indented 4 spaces underneath) into Starlight `:::type[title]` asides.
function convertAdmonitions(content) {
  const lines = content.split('\n');
  const out = [];
  let i = 0;

  const admonitionRe = /^(!!!|\?\?\?\+?)\s+(\S+)(?:\s+"([^"]*)")?\s*$/;

  while (i < lines.length) {
    const match = lines[i].match(admonitionRe);
    if (!match) {
      out.push(lines[i]);
      i++;
      continue;
    }

    const [, , rawType, title] = match;
    const asideType = ADMONITION_MAP[rawType.toLowerCase()] ?? 'note';

    // Collect the indented block that follows (4-space or tab indented).
    const body = [];
    let j = i + 1;
    while (j < lines.length && (lines[j].startsWith('    ') || lines[j].trim() === '')) {
      body.push(lines[j].startsWith('    ') ? lines[j].slice(4) : lines[j]);
      j++;
    }
    // Trim trailing blank lines collected into the block.
    while (body.length && body[body.length - 1].trim() === '') body.pop();

    const marker = title ? `:::${asideType}[${title}]` : `:::${asideType}`;
    out.push(marker, ...body, ':::');
    i = j;
  }

  return out.join('\n');
}

// Rewrites relative `*.md` links (optionally with an anchor) to absolute
// Starlight routes, resolved against the file's location within the docs
// tree. Leaves external links, mailto:, and already-absolute links alone.
function rewriteLinks(content, fileDir) {
  return content.replace(/\]\(([^)]+\.md(?:#[^)]*)?)\)/g, (fullMatch, target) => {
    const [linkPath, anchor] = target.split('#');
    const resolved = path.normalize(path.join(fileDir, linkPath));
    const relativeToRoot = path.relative(SRC_ROOT, resolved).split(path.sep).join('/');
    const withoutExt = relativeToRoot.replace(/\.md$/, '');
    const route = `/docs/${withoutExt}/`;
    return `](${route}${anchor ? `#${anchor}` : ''})`;
  });
}

async function convertFile(filePath) {
  const raw = await readFile(filePath, 'utf8');
  const relDir = path.dirname(path.relative(SRC_ROOT, filePath));

  let result = stripLeadingHeading(raw);
  result = convertAdmonitions(result);
  result = rewriteLinks(result, relDir === '.' ? SRC_ROOT : path.join(SRC_ROOT, relDir));

  const outPath = path.join(OUT_ROOT, path.relative(SRC_ROOT, filePath));
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, result, 'utf8');
  return outPath;
}

async function main() {
  const files = await findMarkdownFiles(SRC_ROOT);
  if (files.length === 0) {
    console.error(`No markdown files found under ${SRC_ROOT}`);
    process.exitCode = 1;
    return;
  }
  const written = [];
  for (const file of files) {
    written.push(await convertFile(file));
  }
  console.log(`Converted ${written.length} files:`);
  for (const w of written) console.log(`  ${path.relative(process.cwd(), w)}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
