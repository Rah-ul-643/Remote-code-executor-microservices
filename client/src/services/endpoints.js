const BASE_URL = process.env.REACT_APP_API_URL;

export const endpoints = {
    SIGNUP_API: `${BASE_URL}auth/register`,
    LOGIN_API: `${BASE_URL}auth/login`,
    COMPILE_API: `${BASE_URL}code`,
    VALIDATE_API: `${BASE_URL}auth/validate`
};