import { Blog as TBlog } from "../api/blog/Blog";

export const BLOG_TITLE_FIELD = "title";

export const BlogTitle = (record: TBlog): string => {
  return record.title || record.id;
};
