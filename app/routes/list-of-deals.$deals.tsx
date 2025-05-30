// app/routes/posts/$slug.tsx

import fs from "fs/promises";
import path from "path";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { remark } from "remark";
import html from "remark-html";
// import { createRequire } from "module";

const IMAGE_EXTS = [".png", ".jpg", ".jpeg"];

function getMimeType(ext: string) {
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
      return "image/jpeg";
    case ".jpeg":
      return "image/jpeg";
    default:
      return "";
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug = "post1" } = params;
  const mdxDir = path.join(process.cwd(), "app/contents");
  const filePath = path.join(mdxDir, `${slug}.mdx`);
  let file = await fs.readFile(filePath, "utf-8");

  // 关键：获取 md 文件所在目录
  const mdDir = path.dirname(filePath);

  // 查找所有 ![alt](./xxx.ext) 形式的图片
  const imageRegex = /!\[([^\]]*)\]\((\.\/[^\)]+\.(png|jpg|jpeg))\)/gi;
  const matches = [...file.matchAll(imageRegex)];

  for (const match of matches) {
    const [fullMatch, alt, relPath] = match;
    // 用 md 文件目录作为基准
    const imgAbsPath = path.join(mdDir, relPath);
    const ext = path.extname(imgAbsPath).toLowerCase();
    if (IMAGE_EXTS.includes(ext)) {
      try {
        const imgBuffer = await fs.readFile(imgAbsPath);
        const base64 = imgBuffer.toString("base64");
        const mime = getMimeType(ext);
        const dataUrl = `data:${mime};base64,${base64}`;
        file = file.replace(fullMatch, `<img src="${dataUrl}" alt="${alt}" />`);
      } catch (e) {
        // 图片不存在时可忽略或处理
      }
    }
  }

  // 用 createRequire 加载 gray-matter
  // const require = createRequire(import.meta.url);

  // 替换 createRequire 方式
  const { default: grayMatter } = await import("gray-matter");
  const { content, data } = grayMatter(file);
  // const matter = require('gray-matter')
  // const { content, data } = matter(file)

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);
  const contentHtml = processedContent.toString();

  return json({ contentHtml, data });
};

export default function Post() {
  const { contentHtml, data } = useLoaderData<typeof loader>();
  return (
    <article>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
