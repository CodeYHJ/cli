import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios"
import { getUrl } from "./urlConfig"
const axiosConfig: AxiosRequestConfig = {
    baseURL: getUrl(),
    headers: {
        "Content-Type": "application/json",
        timeout: 8000
    }
}
const request = axios.create(axiosConfig)

request.interceptors.request.use((cfg: AxiosRequestConfig) => {
    return cfg;
}, (err: AxiosError) => {
    return Promise.reject(err)
})

request.interceptors.response.use((res: AxiosResponse) => {
    const { code, msg, data } = res.data;
    if (code === 200) {
        return data
    } else {
        // 其他处理
        return Promise.reject(msg)
    }
}, (err: AxiosError) => {
    return Promise.reject(err)

})

export default request;