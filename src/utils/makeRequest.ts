import axios, {
  AxiosRequestConfig,
  Method,
  AxiosResponse,
  AxiosError,
} from "axios";

type RequestConfig = AxiosRequestConfig & { method: Method };

export async function makeRequest<T>(config: RequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(
          `API Error: ${axiosError.response.status} - ${axiosError.response.data}`
        );
      } else if (axiosError.request) {
        throw new Error("Network Error: Could not reach the server.");
      } else {
        throw new Error(`Error: ${axiosError.message}`);
      }
    } else {
      throw new Error(`Error: ${(error as Error).message}`);
    }
  }
}
