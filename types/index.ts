import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface FrontMatterType {
  title: string;
  author: string;
  excerpt: string; // 简介
  img: string; // 封面
  date: string; // 创建日期
  updated: string; // 更新日期
}

export interface MarkdownType {
  frontMatter: FrontMatterType | null;
  content: string;
}


export interface FilesType {
  path: string;
  content: string;
}