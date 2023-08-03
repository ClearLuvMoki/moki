import axios, {AxiosRequestConfig, AxiosResponse, AxiosInstance} from 'axios';
import Toast from "@/components/Toast";
import Config from "../../config/config.json"

const service = axios.create({
    baseURL: Config.client.baseUrl,
    timeout: 30000,
})

service.interceptors.request.use(
    config => {
        return config
    },
    err => {
        Toast({content: "请求失败!", type: "error"})
        return Promise.reject(err)
    }
)

service.interceptors.response.use(
    response => {
        const status = response.status;
        if (status !== 200) {
            Toast({content: "请求失败!", type: "error"})
        }
        return response.data
    },
    err => {
        const message = err?.response?.data?.message || "请求失败!"
        Toast({content: message, type: "error"})
        return Promise.reject(err)
    }
)
export const GET = (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
        service.get(url, params)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err);
            })
    })
};

export const POST = (url: string, body?: any) => {
    return new Promise((resolve, reject) => {
        service.post(url, body)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err);
            })
    })
};

export default service
