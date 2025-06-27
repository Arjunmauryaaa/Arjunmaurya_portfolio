
'use client';

import { useEffect, useState } from "react";
import { personalData } from "@/utils/data/personal-data";

import HeroSection from "@/components/homepage/hero-section/index.jsx";
import AboutSection from "@/components/homepage/about/index.jsx";
import Experience from "@/components/homepage/experience/index.jsx";
import Skills from "@/components/homepage/skills/index.jsx";
import Projects from "@/components/homepage/projects/index.jsx";
import Education from "@/components/homepage/education/index.jsx";
import Blog from "@/components/homepage/blog/index.jsx";
import ContactSection from "@/components/homepage/contact/index.jsx";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);
      if (!res.ok) {
        console.error("Failed to fetch blog data");
        return;
      }
      const data = await res.json();
      const filtered = data
        .filter((item) => item?.cover_image)
        .sort(() => Math.random() - 0.5);
      setBlogs(filtered);
    }

    getData();
  }, []);

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  );
}
