import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";
import { ImageResponse } from "next/og";
import fs from "fs/promises";
import path from "path";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const isDirExist = async (path) =>
  await fs
    .access(path)
    .then(() => true)
    .catch(() => false);

async function genImage(title: string, slug: string) {
  const img = new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
          <h2 tw="flex flex-col text-4xl font-bold tracking-tight text-left">
            {title}
          </h2>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
  // Convert the response to an ArrayBuffer
  const arrayBuffer = await img.arrayBuffer();

  // Convert ArrayBuffer to Buffer
  const buffer = Buffer.from(arrayBuffer);
  const uint8Array = new Uint8Array(buffer);

  const prev = path.join(process.cwd(), "public", "prev");

  if (!(await isDirExist(prev))) {
    fs.mkdir(prev);
  }

  return fs.writeFile(path.join(prev, `${slug}.png`), uint8Array);
}

export default function Blog({ params }) {
  const posts = getBlogPosts();
  const post = posts.find(
    (post) => post.slug === decodeURIComponent(params.slug)
  );

  if (!post) {
    notFound();
  }
  const preview = genImage(post.metadata.title, post.slug);

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Ryan Jerue",
            },
          }),
        }}
      />
      <h2 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h2>
      <div className="flex justify-between items-center mt-2 mb-2 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
