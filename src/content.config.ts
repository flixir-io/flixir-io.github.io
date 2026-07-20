import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// blog/recipes are intentionally empty collections for now — schemas are
// kept minimal since there's no content yet. Extend when the first post
// or recipe actually gets written (see plan Task 3 scope note).
//
// Astro 7's content layer requires every collection to declare an
// explicit loader (the old `type: 'content'` shorthand only worked
// under the legacy `src/content/config.ts` location, which Astro 7
// no longer supports — see LegacyContentConfigError). glob() over an
// empty/non-existent directory just yields an empty collection, so
// this is safe before any blog/recipe files exist.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  blog,
  recipes,
};
