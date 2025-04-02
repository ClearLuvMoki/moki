import MomentCard from '@/components/moment-card';
import DefaultLayout from '@/layouts/default';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { Typewriter } from 'react-simple-typewriter';
import fs from "fs";
import {parse} from "path";


interface Props {
  list: {
    id: string;
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
      <div className={"w-full lg:w-[900px] xl:w-[1000px] m-auto"}>
        {
          (list || []).map((item, index) => {
            return <MomentCard
              key={item.id}
              id={item.id}
              content={item.content}
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
  const { resolve, parse } = require("path");
  const dirPath = resolve("./public/moments/" + year)

  let list: any[] = [];
  const childDir = fs.readdirSync(dirPath);
  for (let i in childDir) {
    let childDirPath = resolve(dirPath + '/' + childDir[i]);
    console.log(childDirPath, 'childDirPath')
    if(childDirPath?.endsWith(".md")) {
      const childDirName = parse(childDirPath)?.name;
      const content = fs.readFileSync(childDirPath, "utf-8");
      const indexArr = childDirName.split("-").map((item: string) => Number(item))
      list.push({
        id: `moki-moment-${year}-${childDirName}`,
        month: indexArr[0] || -1,
        day: indexArr[1] || -1,
        content,
      })
    }
  }
  list = (list || []).sort((prev, next) => {
    if (prev.month === -1 && next.month !== -1) return 1;
    if (next.month === -1 && prev.month !== -1) return -1;
    if (prev.month === -1 && next.month === -1) {
      if (prev.day === -1 && next.day !== -1) return 1;
      if (next.day === -1 && prev.day !== -1) return -1;
      if (prev.day === -1 && next.day === -1) return 0;
      return prev.day - next.day;
    }
    if (prev.month !== next.month) return prev.month - next.month;
    return prev.day - next.day;
  });

  return {
    props: {
      list
    }
  }
}
