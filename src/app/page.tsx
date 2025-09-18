import BlogSection from "@/components/blog-section";
import Intro from "@/components/intro";
import Image from "next/image";

export default function Home() {
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
