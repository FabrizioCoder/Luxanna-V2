import type { ApiResponseTypes } from '../config/types';

import { RiotApiWrapper } from '../core/riot-api-wrapper';

type ChampionMasteriesDto =
  ApiResponseTypes<'/lol/champion-mastery/v4/champion-masteries/by-puuid/{encryptedPUUID}'>;
type ChampionMasteryDto =
  ApiResponseTypes<'/lol/champion-mastery/v4/champion-masteries/by-puuid/{encryptedPUUID}/by-champion/{championId}'>;

export class ChampionMasteryService extends RiotApiWrapper {
  /**
   * Obtiene la maestría de un campeón de un invocador.
   * @param puuid - El puuid del invocador.
   * @param championId - El id del campeón.
   * @returns La maestría del campeón.
   * */
  public async getChampionMasteryByPuuidAndChampionId(
    puuid: string,
    championId: number
  ): Promise<ChampionMasteryDto | null> {
    const endpoint = `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/by-champion/${championId}`;
    return this.request<ChampionMasteryDto>(endpoint);
  }

  /**
   * Obtiene las maestrías de campeones de un invocador.
   * @param puuid - El puuid del invocador.
   * @returns Las maestrías de los campeones.
   * */
  public async getChampionMasteriesByPuuid(
    puuid: string
  ): Promise<ChampionMasteriesDto | null> {
    const endpoint = `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`;
    return this.request<ChampionMasteriesDto>(endpoint);
  }
}
