import { Logger } from 'seyfert';
import fs from 'fs/promises';
import axios from 'axios';
import path from 'path';

import type { ChampionData } from '../types/champions';

import { GameVersionService } from './version-service';
const logger = new Logger({ name: '[DataDragonService]' });

export class DataDragonService {
  private static readonly CACHE_DIR = path.join(__dirname, '../../data-cache');

  private static readonly CACHE_EXPIRATION_DAYS = 10;

  public static async updateAllData(): Promise<void> {
    const currentVersion = GameVersionService.getCurrentVersion();

    logger.debug('Updating all cached data...');

    const endpoints = [
      {
        url: `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/champion.json`,
        file: 'champions.json'
      },
      {
        url: `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/item.json`,
        file: 'items.json'
      },
      {
        url: `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/runesReforged.json`,
        file: 'runes.json'
      }
    ];

    for (const { url, file } of endpoints) {
      logger.debug(`Fetching and updating ${file}...`);
      await this.getCachedData(url, file);
    }

    logger.info('All data successfully updated.');
  }

  public static getChampions(): Promise<{
    data: Partial<Record<string, ChampionData>>;
    version: string;
    format: string;
    type: string;
  }> {
    const currentVersion = GameVersionService.getCurrentVersion();
    const endpoint = `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/champion.json`;
    return this.getCachedData(endpoint, 'champions.json') as never;
  }

  public static async getChampionDetails(championId: string): Promise<any> {
    const championsData = await this.getChampions();
    const championInfo = championsData.data[championId];

    if (!championInfo) {
      throw new Error(`Champion with ID "${championId}" not found.`);
    }

    return championInfo;
  }

  public static async getRunes(): Promise<any> {
    const currentVersion = GameVersionService.getCurrentVersion();
    const endpoint = `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/runesReforged.json`;
    return this.getCachedData(endpoint, 'runes.json');
  }

  public static async getItems(): Promise<any> {
    const currentVersion = GameVersionService.getCurrentVersion();
    const endpoint = `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/item.json`;
    return this.getCachedData(endpoint, 'items.json');
  }

  public static getSummonerIcon(iconId: number): string {
    const currentVersion = GameVersionService.getCurrentVersion();
    return `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${iconId}.png`;
  }

  private static async getCachedData(
    endpoint: string,
    fileName: string
  ): Promise<any> {
    await this.ensureCacheDir();
    const filePath = path.join(this.CACHE_DIR, fileName);

    if (await this.isCacheExpired(filePath)) {
      logger.debug(`Fetching fresh data from ${endpoint}...`);
      const response = await axios.get(endpoint);
      await fs.writeFile(filePath, JSON.stringify(response.data, null, 2));
    }

    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }

  private static async isCacheExpired(filePath: string): Promise<boolean> {
    try {
      const stats = await fs.stat(filePath);
      const now = Date.now();
      const fileTime = new Date(stats.mtime).getTime();
      const diffDays = (now - fileTime) / (1_000 * 60 * 60 * 24);
      return diffDays > this.CACHE_EXPIRATION_DAYS;
    } catch {
      return true; // Si no existe el archivo, se considera expirado.
    }
  }

  private static async ensureCacheDir(): Promise<void> {
    await fs.mkdir(this.CACHE_DIR, { recursive: true });
  }
}
