import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL;

const noAuthInstance = axios.create({ baseURL: BASE_URL });
const authInstance = axios.create({ baseURL: BASE_URL });

authInstance.interceptors.request.use(config => {
  config.headers = {
    // TODO: accessToken storage에서 가져오도록 추가
    Authorization: `Bearer TOKEN`,
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
  error => {
    // TODO: Unauthorization 에러에 대한 refresh Token으로의 재인증요청 처리 필요
    const errorResponse = {
      ...error.response.data,
      status: error.response.status,
    };
    return Promise.reject(errorResponse);
  },
);

export { authInstance, noAuthInstance };
