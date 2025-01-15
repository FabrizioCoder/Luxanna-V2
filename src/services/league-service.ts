import type { ApiResponseTypes, } from '../config/types';

import { RiotApiWrapper, } from '../core/riot-api-wrapper';

type LeagueEntryDTO =
  ApiResponseTypes<'/lol/league/v4/entries/by-summoner/{encryptedSummonerId}'>;

export class LeagueService extends RiotApiWrapper {
  /**
   * Obtiene la información de la liga de un invocador.
   * @param summonerId - El id del invocador.
   * @returns La información de la liga del invocador.
   * */
  public async getLeagueBySummonerId(
    summonerId: string
  ): Promise<LeagueEntryDTO | null> {
    const endpoint = `/lol/league/v4/entries/by-summoner/${summonerId}`;
    return this.request<LeagueEntryDTO>(endpoint);
  }
}
