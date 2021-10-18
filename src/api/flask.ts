import axios from 'axios';
import config from '../components/config';

const { apiGateway } = config;

const Flask = () => {
    const defaultOptions = {
      baseURL: apiGateway.URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5 * 60 * 1000, // 5 min
    };
  
    let instance = axios.create(defaultOptions);
  
    instance.interceptors.request.use(function (config:any) {
    //   const token = getToken();
    //   const token = {
    //         "AccessToken": "Duy",
    //         "time": 3600}
    //   config.headers.Authorization = token ? token.AccessToken : '';
    //   config.headers['X-Api-Key'] = apiGateway.X_API_KEY;
    config.headers['Access-Control-Allow-Origin'] = window.location.origin;
      return config;
    });
  
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {      
            const originalRequest = error.config;
            if (
            [401, 402, 403].includes(error?.response?.status)) {
                return instance(originalRequest);
            } 
            else {
                error.message = 'Something went wrong! Please try again later.';
            }
            return Promise.reject(error);
        },
    );
  
    return instance;
  };

export default Flask();

export const BaseAPI = Flask();