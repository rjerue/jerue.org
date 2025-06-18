import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <h2 className="font-semibold text-2xl mb-4 tracking-tighter">Blog</h2>
      <BlogPosts />
    </section>
  );
}
