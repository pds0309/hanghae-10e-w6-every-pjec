import axios from 'axios';
import { setToken } from '../utils/tokenHandler';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const IMAGE_URL = process.env.REACT_APP_IMAGE_ENDPOINT;

const noAuthInstance = axios.create({ baseURL: BASE_URL });
const authInstance = axios.create({ baseURL: BASE_URL });
const imageInstance = axios.create({ baseURL: IMAGE_URL });

authInstance.interceptors.request.use(config => {
  config.headers = {
    Authorization: `Bearer%${localStorage.getItem('accessToken')}`,
  };

  return config;
});

noAuthInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const errorResponse = {
      ...error.response.data,
      status: error.response.status,
    };
    return Promise.reject(errorResponse);
  },
);

authInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response?.status === 401) {
      try {
        const response = await axios.post(
          BASE_URL + '/user/reissuance',
          {},
          {
            headers: {
              Authorization:
                'Bearer%' +
                localStorage.getItem('accessToken') +
                '%' +
                localStorage.getItem('refreshToken'),
            },
          },
        );
        setToken(response.data.authorization);
        error.config.headers.Authorization = 'Bearer%' + localStorage.getItem('accessToken');
        return axios(error.config);
      } catch (err) {
        localStorage.clear();
        window.location.reload();
      }
    }
    const errorResponse = {
      ...error.response.data,
      status: error.response.status,
    };
    return Promise.reject(errorResponse);
  },
);

imageInstance.interceptors.request.use(config => {
  config.headers = {
    Authorization: `Bearer%${localStorage.getItem('accessToken')}`,
  };

  return config;
});

imageInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const errorResponse = {
      ...error.response.data,
      status: error.response.status,
    };
    return Promise.reject(errorResponse);
  },
);

export { authInstance, noAuthInstance, imageInstance };
