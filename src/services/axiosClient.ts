import axios from 'axios';
import queryString from 'query-string';

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

const axiosClient = axios.create({
    baseURL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosClient;
