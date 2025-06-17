import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <div key={post.slug} className="mb-8">
            <Link href={`/blog/${post.slug}`}>
              <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight font-bold underline">
                  {post.metadata.title}
                </p>
                <p className="mt-1 sm:mt-0 text-sm text-neutral-600 dark:text-neutral-400 tabular-nums text-right">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>
            </Link>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300">
              {post.metadata.summary}
            </p>
          </div>
        ))}
    </div>
  );
}
