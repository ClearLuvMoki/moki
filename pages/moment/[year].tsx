import MomentCard from '@/components/moment-card';
import DefaultLayout from '@/layouts/default';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { Typewriter } from 'react-simple-typewriter';


interface Props {
  list: {
    content: string
    images: string[];
  }[];
}

export default function MomentList({ list }: Props) {
  const router = useRouter();
  const year = router.query?.year;

  return (
    <DefaultLayout
    >
      <div className={"m-auto flex flex-col justify-center items-center  h-[500px]"}>
        <div className={"text-4xl font-bold flex justify-center w-10/12 break-words"}>
          <Typewriter
            loop={false}
            cursor
            cursorStyle='_'
            words={[`${year}\``]}
            delaySpeed={3000}
          />
        </div>
      </div>
      <div className="flex">
        {
          (list || []).map((item, index) => {
            return <MomentCard
              key={index}
              content={item.content}
              images={item.images}
            />
          })
        }
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const fs = require("fs");
  const year = query?.year;
  const { resolve, extname } = require("path");
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  const dirPath = resolve("./public/moments/" + year)

  const list = [];
  const childDir = fs.readdirSync(dirPath);
  for (let i in childDir) {
    let childDirPath = resolve(dirPath + '/' + childDir[i]);
    if (fs.statSync(childDirPath).isDirectory()) {
      const files = fs.readdirSync(childDirPath);
      const docPath = resolve(childDirPath + "/" + "index.md");
      const content = fs.readFileSync(docPath, "utf-8");
      const images = files.filter((file: any) => {
        const ext = extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      }).map((file: any) => "file://" + resolve(childDirPath, file)) || []
      list.push({
        content,
        images
      })
    }
  }

  return {
    props: {
      list
    }
  }
}
