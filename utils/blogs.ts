import { posts } from "../blogs.json";

export const getBlogs = async () => {
  const blogs = await Promise.all(
    posts.map(async (post) => {
      const { intro, date, hidden } = await import(`../pages/blog/${post}.mdx`);
      return {
        intro: intro as string,
        slug: post,
        date: date as string,
        hidden: hidden || false,
      };
    })
  );
  const sorted = blogs.sort(
    ({ date: leftDate }, { date: rightDate }) =>
      Number(new Date(rightDate)) - Number(new Date(leftDate))
  );
  return sorted;
};
