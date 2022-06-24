import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export default abstract class Scraper {
    baseUrl: string;
    client: AxiosInstance;

    constructor(
        baseUrl: string,
        axiosConfig?: AxiosRequestConfig,
        timeout?: number,
    ) {
        const config = {
            header: {
                referer: baseUrl,
                origin: baseUrl,
            },
            timeout: timeout || 10000,
            ...axiosConfig,
        };

        this.baseUrl = baseUrl;
        this.client = axios.create(config);
    }

    public unshiftProtocol(urlSrc: string) {
        const protocols = ['http', 'https'];

        return protocols.some((protocol) => urlSrc.includes(protocol))
            ? urlSrc
            : `https:${urlSrc}`;
    }
}
