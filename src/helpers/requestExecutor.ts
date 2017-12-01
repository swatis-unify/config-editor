import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const requestExecutor = async <T extends {}>(method: string, url: string, params: any, data: any): Promise<T> => {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };

    const axiosConfig: AxiosRequestConfig = {
        method: method,
        url: url,
        params: params,
        data: data,
        headers: headers
    };

    const response: AxiosResponse = await axios(axiosConfig);
    return response.data as T;
};

export default requestExecutor;
