
export interface BlogPostRu {
  titleRu: string;
  excerptRu: string;
  contentRu: string;
  tagsRu: string[];
  readTimeRu: string;
  dateRu: string;
}

import { batch1Translations } from "./blogPostsRu_batch1";
import { batch2Translations } from "./blogPostsRu_batch2";
import { batch3Translations } from "./blogPostsRu_batch3";
import { batch4Translations } from "./blogPostsRu_batch4";
import { batch5Translations } from "./blogPostsRu_batch5";
import { batch6Translations } from "./blogPostsRu_batch6";

// Russian translations for all 21 blog posts, keyed by slug
export const blogPostTranslations: Record<string, BlogPostRu> = {
  ...batch1Translations,
  ...batch2Translations,
  ...batch3Translations,
  ...batch4Translations,
  ...batch5Translations,
  ...batch6Translations,
};
