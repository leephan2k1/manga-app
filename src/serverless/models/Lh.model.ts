import { AxiosRequestConfig } from 'axios';

import Scraper from '../libs/Scraper';

export default class LhModel extends Scraper {
    private static instance: LhModel;

    private constructor(
        baseUrl: string,
        axiosConfig?: AxiosRequestConfig,
        timeout?: number,
    ) {
        super(baseUrl, axiosConfig, timeout);
    }

    public static getInstance(
        baseUrl: string,
        axiosConfig?: AxiosRequestConfig,
        timeout?: number,
    ) {
        if (!this.instance) {
            this.instance = new this(baseUrl, axiosConfig, timeout);
        }

        return this.instance;
    }

    public async search(title: string) {
        try {
            const { data } = await this.client.get(
                `${this.baseUrl}/action/search`,
                {
                    params: {
                        q: title,
                    },
                },
            );

            return data;
        } catch (err) {
            return null;
        }
    }
}
