import axios, { AxiosInstance, AxiosError } from 'axios';

/**
 * Clase que envuelve la API de Riot para facilitar las solicitudes.
 */
export class RiotApiWrapper {
  protected api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  /**
   * Realiza una solicitud GET a la API de Riot.
   */
  protected async request<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    try {
      const response = await this.api.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error, endpoint);
    }
  }

  /**
   * Maneja errores de la solicitud.
   */
  private handleError(error: unknown, endpoint: string): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(
        `Error fetching data from ${endpoint}:`,
        axiosError.response?.data || axiosError.message
      );
      throw new Error(
        `Failed to fetch data from ${endpoint}: ${axiosError.message}`
      );
    } else {
      console.error(`Unexpected error fetching data from ${endpoint}:`, error);
      throw new Error(`Unexpected error: ${String(error)}`);
    }
  }
}
