import { IUser } from '../models/IUser'
import { makeAutoObservable } from 'mobx'
import AuthService from '../service/AuthService'

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

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(name: string,email: string, password: string) {
        try {
            const response = await AuthService.registration(name, email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch(e: any) {
            console.log(e.response?.data?.message)
        }
    }
}