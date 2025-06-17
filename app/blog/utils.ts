import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

/**
 * Parses the frontmatter and content from a file string.
 * Supports multi-line values for metadata fields enclosed in backticks (`).
 *
 * @param fileContent The full content of the file as a string.
 * @returns An object containing the parsed metadata and the main content.
 */
function parseFrontmatter(fileContent: string): {
  metadata: Metadata;
  content: string;
} {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  // If no frontmatter block is found, return the content as is.
  if (!match) {
    return { metadata: {} as Metadata, content: fileContent };
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  for (let i = 0; i < frontMatterLines.length; i++) {
    const line = frontMatterLines[i];
    const colonIndex = line.indexOf(":");

    // Skip empty lines or lines without a key-value structure
    if (colonIndex === -1) {
      continue;
    }

    const key = line.substring(0, colonIndex).trim();
    let valuePart = line.substring(colonIndex + 1).trim();

    // Check for multi-line strings starting with `
    if (valuePart.startsWith("`")) {
      // Handle the case where the backticked value is on a single line
      if (valuePart.endsWith("`") && valuePart.length > 1) {
        metadata[key as keyof Metadata] = valuePart.slice(1, -1);
        continue;
      }

      const multiLineValue = [valuePart.slice(1)]; // Remove the opening backtick

      // Consume subsequent lines until a closing backtick is found
      while (++i < frontMatterLines.length) {
        const nextLine = frontMatterLines[i];
        if (nextLine.trim().endsWith("`")) {
          multiLineValue.push(nextLine.trim().slice(0, -1)); // Add the final line, removing the closing backtick
          break; // Exit the multi-line loop
        } else {
          multiLineValue.push(nextLine);
        }
      }
      metadata[key as keyof Metadata] = multiLineValue.join("\n");
    } else {
      // Process regular single-line values
      valuePart = valuePart.replace(/^['"](.*)['"]$/, "$1"); // Remove surrounding quotes
      metadata[key as keyof Metadata] = valuePart;
    }
  }

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
