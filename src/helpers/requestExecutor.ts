import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const requestExecutor = async <T extends {}>(method: string, url: string, params: any, data: any): Promise<T> => {
    let headers = { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'Authorization': ''
    };

    if(params.access_token != null){
        headers.Authorization = 'token ' + params.access_token;
    }
    
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
