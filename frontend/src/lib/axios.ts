import { TokenService } from '@/services/token-service';
import axios from 'axios';
import { getAccessToken } from './auth/token';
import { EnvService } from '@/services/env-service';
import { queryClient } from '@/app/_components/QueryProvider';

export const axiosInstance = axios.create({
  baseURL: EnvService.baseUrl
});

// axiosInstance.interceptors.response.use(null, async (err: AxiosError) => {
//   const rToken = TokenService.getRefreshToken();
//   console.log(err.request);
//   if (rToken) {
//     const token = await getAccessToken();
//   }
//   return err;
// });

axiosInstance.interceptors.request.use(async (req) => {
  const aToken = TokenService.getAccessToken();
  if (aToken) {
    req.headers.Authorization = `Bearer ${aToken}`;
  }

  // const rToken = TokenService.getRefreshToken();
  // if (!rToken) {
  //   console.log('Refresh Token not found');
  //   queryClient.setQueryData(['userProfile'], null);
  // }

  // const res = await getAccessToken();

  return req;
});

// axiosInstance.interceptors.request.use(async (req) => {
//   try {
//     const aToken = TokenService.getAccessToken();
//     const rToken = TokenService.getRefreshToken();
//     if (aToken) {
//       req.headers.Authorization = `Bearer ${aToken}`;
//     } else {
//       console.log('No access token');
//       if (rToken) {
//         const token = await getAccessToken();
//         req.headers.Authorization = `Bearer ${token.accessToken}`;
//       }
//     }
//   } catch (err: any) {
//     console.log(err);
//     // TokenService.clear();
//   }

//   return req;
// });
