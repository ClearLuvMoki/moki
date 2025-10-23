import BlogSection from "@/components/blog-section";
import Intro from "@/components/intro";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = await headers();

  return (
    <section>
      <Intro />
      <div className="mb-20 flex flex-col items-center space-y-40">
        <BlogSection />
        {/* <SkillSection /> */}
        {/* <ExperienceSection /> */}
      </div>
    </section>
  );
}
