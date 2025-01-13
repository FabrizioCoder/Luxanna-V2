import axios, { AxiosInstance, AxiosError } from 'axios';
import { Logger } from 'seyfert';
const logger = new Logger({
  name: '[RiotApiWrapper]',
});
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
  ): Promise<T | null> {
    // Retorna null si hay un error 404
    try {
      const response = await this.api.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      return this.handleError(error, endpoint);
    }
  }

  /**
   * Maneja errores de la solicitud.
   */
  private handleError(error: unknown, endpoint: string): null {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      // Si el código de estado es 404, retorna null
      if (axiosError.response?.status === 404) {
        logger.warn(`Resource not found at ${endpoint} (404). Returning null.`);
        return null;
      }

      logger.error(
        `Error fetching data from ${endpoint}:`,
        axiosError.response?.data || axiosError.message
      );
      throw new Error(
        `Failed to fetch data from ${endpoint}: ${axiosError.message}`
      );
    } else {
      logger.error(`Unexpected error fetching data from ${endpoint}:`, error);
      throw new Error(`Unexpected error: ${String(error)}`);
    }
  }
}
