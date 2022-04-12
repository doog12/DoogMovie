import { IUser } from '../models/IUser'
import { makeAutoObservable } from 'mobx'
import AuthService from '../service/AuthService'
import axios from 'axios'
import { API_URL } from '../http'
import { AuthResponse } from '../models/response/AuthResponse'
import { UserInfoResponse } from '../models/response/UserInfoResponse'

export default class Store {
    user = {} as IUser
    isAuth: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    async login(email: string, password: string): Promise<number | undefined> {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            return response.status
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(name: string, email: string, password: string): Promise<number | undefined> {
        try {
            const response = await AuthService.registration(name, email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            return response.status
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
                withCredentials: true
            })
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async getUserInfo(userId: string | undefined) {
        try {
            const response = await axios.get<UserInfoResponse>(`${API_URL}/get_user`, {
                params: {
                    userId
                }
            })
            return response
        } catch (e: any) {
            console.log(e)
        }
    }
}
