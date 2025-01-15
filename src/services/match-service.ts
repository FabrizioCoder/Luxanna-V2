import type { ApiResponseTypes, } from 'src/config/types';

import { RiotApiWrapper, } from '../core/riot-api-wrapper';

type MatchDto = ApiResponseTypes<'/lol/match/v5/matches/{matchId}'>;

export class MatchService extends RiotApiWrapper {
  /**
   * Obtiene la lista de partidas de un invocador.
   * @param puuid - El puuid del invocador.
   * @param query - Los parámetros de la consulta.
   * @returns La lista de partidas del invocador.
   */
  public async getMatchList(
    puuid: string,
    query: QueryParameters
  ): Promise<MatchDto[] | null> {
    const matchList = await this.getMatchListByPuuid(puuid, query);
    if (!matchList) {
      return null;
    }

    const matchPromises = matchList.map((matchId) => this.getMatchById(matchId));
    const matches = await Promise.all(matchPromises);
    return matches.filter((match): match is MatchDto => match !== null);
  }

  /**
   * Obtiene la información de una partida por su id.
   * @param matchId - El id de la partida.
   * @returns La información de la partida.
   */
  public async getMatchById(matchId: string): Promise<MatchDto | null> {
    const endpoint = `/lol/match/v5/matches/${matchId}`;
    return this.request<MatchDto>(endpoint);
  }

  private async getMatchListByPuuid(
    puuid: string,
    query: QueryParameters
  ): Promise<string[] | null> {
    const endpoint = `/lol/match/v5/matches/by-puuid/${puuid}/ids`;
    return this.request<string[]>(endpoint, query);
  }
}

interface QueryParameters {
  startTime: number;
  endTime: number;
  queue: number;
  start: number;
  count: number;
  type: string;
}
