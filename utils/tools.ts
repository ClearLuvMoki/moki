import CryptoJS from "crypto-js"
import matter from 'gray-matter';
import dayjs from "dayjs";
import {MarkdownType} from "@/types";


export class CryptoSearchKey {
    static Key = "search-key";

    static enCode(originText: string) {
        if (!originText) return "";
        const cipherText = CryptoJS.AES.encrypt(originText, this.Key).toString();
        return cipherText;
    }

    static deCode(cipherText: string) {
        if (!cipherText) return "";
        const originText = CryptoJS.AES.decrypt(cipherText, this.Key).toString(CryptoJS.enc.Utf8)
        return originText;
    }
}


export const RenderTransformMarkdown = (content: string): Promise<MarkdownType | null> => {
    return new Promise(async (resolve) => {
        try {
            if (!content) return resolve(null)
            const res = matter(content);
            resolve({
                frontMatter: {
                    title: res.data?.title || "",
                    img: res.data?.img || "",
                    author: res.data?.author || "",
                    excerpt: res.data?.excerpt || "",
                    date: res.data?.date ? dayjs(res.data?.date).format("YYYY-MM-DD") : "",
                    updated: res.data?.updated ? dayjs(res.data?.updated).format("YYYY-MM-DD") : "",
                },
                content: res.content || ""
            })

        } catch (err) {
            resolve(null)
        }
    })
}
