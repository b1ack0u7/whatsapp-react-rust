import Axios, { AxiosError, AxiosResponse } from "axios";
import { IRequest } from '../interfaces/interfaces';

const requester = async <T>({ url, method = "GET", data = {}, params = {} }: {url:string, method?:string, data?:unknown, params?:unknown}) => {
  return Axios({
    // headers: { authtoken: process.env.REACT_APP_AUTHTOKEN },
    // baseURL: process.env.REACT_APP_URL,
    url,
    method, 
    data,
    params,
  })
    .then((res: AxiosResponse) => {
      return <IRequest<T>>res.data;
    })
    .catch((err: AxiosError) => {
      return <IRequest<any>>{success: false, reason: err.response?.data || err.message};
    });
};

export default requester;
