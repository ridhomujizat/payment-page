const { VITE_APP_API_URL, VITE_APP_BASIC_USER, VITE_APP_BASIC_PASS } =
  import.meta.env;
const config = {
  baseURL: VITE_APP_API_URL,
  basic: {
    username: VITE_APP_BASIC_USER,
    password: VITE_APP_BASIC_PASS,
  },
};

export default config;
