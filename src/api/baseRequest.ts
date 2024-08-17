import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Base URL for API requests
export const BASE_URL = "https://app.weddingly.io";

// Function to get session token (mock implementation)
export const getSessionToken = (): string | null => {
  // Mock implementation
  // const sessionToken = getStorageSync(SESSION_KEY);
  // if (sessionToken) {
  //   return sessionToken;
  // }
  return null;
};

// Type for custom Axios request configuration with optional `skipToken`
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipToken?: boolean;
}

// Define an array to hold cancel tokens
const cancelArr: ((message?: string) => void)[] = [];

// Handle token inclusion in request config
const handleUseToken = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { skipToken = false } = config as CustomAxiosRequestConfig;

  if (skipToken) {
    return config;
  }

  const token = getSessionToken();

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

// Handle cancellation token in request config
const handleCancelKey = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.cancelToken = new axios.CancelToken((c) => {
    cancelArr.push(c);
  });

  return config;
};

// Handle errors
const handleError = async (error: AxiosError): Promise<never> => {
  // Handle specific error status or instance here if needed
  console.error("API call error:", error);
  throw error;
};

// Create an Axios instance with interceptors
const createAxiosInstance = (
  config?: CustomAxiosRequestConfig
): AxiosInstance => {
  const requestConfig: AxiosRequestConfig = {
    responseType: "json",
    withCredentials: true,
    ...config,
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...config?.headers,
    },
  };

  const instance = axios.create(requestConfig);

  // Add request interceptors
  instance.interceptors.request.use(handleUseToken);
  instance.interceptors.request.use(handleCancelKey);

  // Add response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    handleError
  );

  return instance;
};

export default createAxiosInstance;
