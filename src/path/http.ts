import { Path } from "./path";

import A, { AxiosInstance, AxiosRequestConfig } from "axios"

export class Http extends Path{
    constructor(
        ssl: boolean = true,
        public client: AxiosInstance | null = null
    ){
        super(ssl ? "https://": "http://")
    }

    getClient(){
        if (this.client === null) {
            this.client = A.create()
            this.client.interceptors.request.use(e => e, e => e)
        }
        return this.client
    }

    async request(config?: AxiosRequestConfig){
        return this.getClient().request({
            ...config,
            url: this.toString()
        })
    }

    async get(config?: AxiosRequestConfig){
        return await this.request({
            ...config,
            "method": "GET"
        })
    }

    async post(config?: AxiosRequestConfig){
        return await this.request({
            ...config,
            "method": "POST"
        })
    }

    static l(...arg: string[]){
        const h = new Http()
        h.l(...arg)
        return h
    }

    static c(ssl: boolean, client: AxiosInstance | null){
        return new Http(ssl, client)
    }

}

export default Http
