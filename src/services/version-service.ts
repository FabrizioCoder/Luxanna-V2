import { Logger } from 'seyfert';
import axios from 'axios';
const logger = new Logger({ name: '[GameVersionService]' });

export class GameVersionService {
  private static updateInterval: NodeJS.Timeout | null = null;

  private static readonly CHECK_INTERVAL = 30 * 60 * 1_000; // 30 minutos

  private static currentVersion: string | null = null;

  public static async updateVersion(): Promise<string> {
    try {
      const response = await axios.get<string[]>(
        'https://ddragon.leagueoflegends.com/api/versions.json'
      );

      const latestVersion = response.data[0];
      if (this.currentVersion !== latestVersion) {
        this.currentVersion = latestVersion;
        logger.info(`Game version updated to ${this.currentVersion}`);
      }

      return this.currentVersion;
    } catch (error) {
      logger.error(
        `Failed to update game version: ${(error as Error).message}`
      );
      throw error;
    }
  }

  public static startAutoUpdate(): void {
    void this.updateVersion();

    this.updateInterval = setInterval(() => {
      void this.updateVersion();
    }, this.CHECK_INTERVAL);
  }

  public static stopAutoUpdate(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  /**
   * Obtiene la versión actual almacenada en memoria.
   * @returns La versión actual o `null` si no está definida.
   */
  public static getCurrentVersion(): string | null {
    return this.currentVersion;
  }
}
