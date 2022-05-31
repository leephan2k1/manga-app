import { AxiosResponse } from 'axios';
import { NtSearchResponse } from '~/types';

import axiosClient from './axiosClient';

const resource = 'nt';

export interface NtRepository {
    search: (mangaTitle: string) => Promise<AxiosResponse<NtSearchResponse>>;
}

const NtApi: NtRepository = {
    search: (mangaTitle: string) => {
        return axiosClient.get(`${resource}/search`, {
            params: { q: mangaTitle },
        });
    },
};

export default NtApi;
