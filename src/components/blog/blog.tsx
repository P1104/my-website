// File: src/components/home/home.tsx

import { BlogSectionOne } from "./blog-sec-one/blog-sec-one";
import { BlogSectionThree } from "./blog-sec-three/blog-sec-three";
import { BlogSectionTwo } from "./blog-sec-two/blog-sec-two";

export function BlogPage() {
  return (
    <div>
      <BlogSectionOne />
      <BlogSectionTwo />
      <BlogSectionThree />
    </div>
  );
}
