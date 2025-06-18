import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <p className="mb-4">
        I am Ryan Jerue, a Software Engineer working for Amazon in Arlington,
        Virginia. My focus is in creating scalable web systems. I can be
        contacted by email over ryan at jerue dot org.
      </p>
      <h2 className="mb-4 text-2xl font-semibold tracking-tighter">
        About me:
      </h2>
      <ul className="list-disc pl-6">
        <li className="mb-2">
          Previously worked at Reify Health, Viasat, Charles River Development,
          NAVSEA, and with the RIPPLES group at my alma mater, the University of
          Massachusetts Amherst.
        </li>
        <li className="mb-2">
          Enjoy working with JavaScript, TypeScript, Clojure(Script), React,
          React Native, Java, REST, GraphQL, APIs, SQL, MongoDB, and more.
        </li>
        <li className="mb-2">
          I love photography; hiking and camping; cheering on Liverpool, Red
          Sox, Patriots; and playing soccer.
        </li>
      </ul>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
