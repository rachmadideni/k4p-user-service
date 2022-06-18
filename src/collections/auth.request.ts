import { Item } from 'postman-collection';
import { baseUrl, requestHeader } from './index';

const requestPayload = {
  email: '',
  password: '',
};

export const signupRequest = new Item({
  name: '',
  request: {
    header: requestHeader,
    url: baseUrl + 'auth/signup',
    method: 'POST',
    body: {
      mode: 'raw',
      raw: JSON.stringify(requestPayload),
    },
    auth: undefined,
  },
});

export const signinRequest = new Item({
  name: '',
  request: {
    header: requestHeader,
    url: baseUrl + 'auth/signin',
    method: 'POST',
    body: {
      mode: 'raw',
      raw: JSON.stringify({
        email: '',
        password: '',
      }),
    },
    auth: undefined,
  },
});

export const refreshTokenRequest = new Item({
  name: 'refresh token request',
  request: {
    header: requestHeader,
    url: baseUrl + 'auth/refreshToken',
    method: 'POST',
    body: {
      mode: 'raw',
      raw: JSON.stringify({
        refreshToken: '',
      }),
    },
    auth: undefined,
  },
});
