import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

export const API_URL = `${process.env.REACT_APP_API_URL}/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: AxiosRequestConfig<AxiosRequestHeaders>) => {
    const token = localStorage.getItem('token')
    config.headers!.Authorization = `Bearer ${token}`
    return config
})

export default $api