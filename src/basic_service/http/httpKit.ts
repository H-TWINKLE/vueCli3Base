import Axios, { AxiosRequestConfig } from 'axios'

class HttpKit {
    private static instance: HttpKit
    protected http: any = Axios
    protected axiosConfig: AxiosRequestConfig = {}

    public static getInstance(): HttpKit {
        this.instance || (this.instance = new HttpKit())
        return this.instance
    }

    constructor() {
        this.httpConfig()
        this.http = Axios.create(this.axiosConfig)
        this.interceptorsRequest()
        this.interceptorsResponse()
    }

    protected httpConfig(): void {
        this.axiosConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            timeout: 30000,
            transformResponse: [function transformResponse(data) {
                const reg = /^[0-9]+.?[0-9]*/
                if (reg.test(data)) {
                    return data
                }
                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data)
                    } catch (e) {
                    }
                }
                return data
            }]
        }
    }

    protected interceptorsRequest() {
        this.http.interceptors.request.use(
            (config: any) => {
                if (config.isBaseService) {
                    config.headers['Content-Type'] = 'application/json; charset=UTF-8'
                }
                return config
            },
            (error: any) => {
                return Promise.reject(error)
            }
        )
    }

    protected interceptorsResponse() {
        this.http.interceptors.response.use(
            (response: any) => {
                return response.data
            },
            (error: any) => {
                return Promise.reject(error)
            }
        )
    }

    public async get(url: string, params: any = {}, config: AxiosRequestConfig = {}) {
        try {
            config.params = params
            return await this.http.get(url, { params })
        } catch (error) {
            console.log('error:' + error)
        }
    }

    public async post(url: string, data: any = {}, config: object = {}) {
        try {
            return await this.http.post(url, data, config)
        } catch (error) {
            console.log('error:' + error)
        }
    }
}

export default HttpKit.getInstance()
