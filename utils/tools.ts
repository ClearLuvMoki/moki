import CryptoJS from "crypto-js"

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
