import BlogSection from "@/components/blog-section";
import Intro from "@/components/intro";
import { compareDesc } from "@/lib/utils";
import { getPublishedBlogs } from "@/lib/blogs";

export default async function Home() {
  const blogs = getPublishedBlogs()
    .sort((a, b) => compareDesc(new Date(a.createDate), new Date(b.createDate)))
    .slice(0, 4);

  return (
    <section>
      <Intro />
      <div className="mb-20 flex flex-col items-center space-y-40">
        <BlogSection blogs={blogs} />
        {/* <SkillSection /> */}
        {/* <ExperienceSection /> */}
      </div>
    </section>
  );
}
