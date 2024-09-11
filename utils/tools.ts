import CryptoJS from "crypto-js"
import matter from 'gray-matter';
import dayjs from "dayjs";
import { MarkdownType } from "@/types";
import { LucideIcon, LucideProps, SunDim } from "lucide-react";


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


export const convertToBase64 = (url: string): Promise<{ blob: Blob; base64: ArrayBuffer | string | null }> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve({
                    blob,
                    base64: reader.result || null
                })
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            reject(error)
        }
    })
};


export const transformExifKey = (key: string, props?: Partial<LucideProps>) => {
    switch (key) {
        case "latitude":
            return {
                title: "纬度"
            }
        case "longitude":
            return {
                title: "经度"
            }
        case "date":
            return {
                title: "日期"
            }
        case "iso":
            return {
                title: "ISO"
            }
        case "altitude":
            return {
                title: "海拔"
            }
        case "whiteBalance":
            return {
                title: "白平衡"
            }
        case "focalLength":
            return {
                title: "焦距"
            }
        case "fNumber":
            return {
                title: "ƒ"
            }
        case "exposureTime":
            return {
                title: "快门速度"
            }
        case "brightnessValue":
            return {
                title: "亮度",
            }
        case "flash":
            return {
                title: "闪光灯"
            }
        default:
            break;
    }
}

export const saveCachePpsition = (key: string, value: string) => {
    if (!key || !value) return;
    const localStorageKey = "moki-moment-position";
    const positionJSON = window.localStorage.getItem(localStorageKey);
    let data = JSON.parse(positionJSON || "{}");
    Object.assign(data, {
        [key]: value
    })
    window.localStorage.setItem(localStorageKey, JSON.stringify(data))
}

export const getCachePpsition = (key: string): string | null => {
    try {
        if (!key) return null;
        const localStorageKey = "moki-moment-position";
        const positionJSON = window.localStorage.getItem(localStorageKey);
        let data = JSON.parse(positionJSON || "{}");
        return data[key] || null
    } catch (err) {
        return null
    }
}