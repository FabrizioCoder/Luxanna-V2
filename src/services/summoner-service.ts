import { RiotApiWrapper } from '../core/riot-api-wrapper';
import { ApiResponseTypes } from '../config/types';
import { LeagueService } from './league-service';
import { ChampionMasteryService } from './champion-mastery-service';
import { MatchService } from './match-service';

type SummonerDTO =
  | ApiResponseTypes<'/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}'>
  | ApiResponseTypes<'/lol/summoner/v4/summoners/by-account/{encryptedAccountId}'>;
type LeagueEntryDTO =
  ApiResponseTypes<'/lol/league/v4/entries/by-summoner/{encryptedSummonerId}'>;
type ChampionMasteriesDto =
  ApiResponseTypes<'/lol/champion-mastery/v4/champion-masteries/by-puuid/{encryptedPUUID}'>;
type ChampionMasteryDto =
  ApiResponseTypes<'/lol/champion-mastery/v4/champion-masteries/by-puuid/{encryptedPUUID}/by-champion/{championId}'>;
type MatchDto = ApiResponseTypes<'/lol/match/v5/matches/{matchId}'>;

export class SummonerService extends RiotApiWrapper {
  /**
   * Obtiene la información de un invocador por su puuid.
   * @param puuid - El puuid del invocador.
   * @returns La información del invocador.
   * */
  public async getByPuuid(puuid: string): Promise<SummonerDTO | null> {
    const endpoint = `/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    return this.request<SummonerDTO>(endpoint);
  }

  /**
   * Obtiene la información de un invocador por su accountId.
   * @param accountId - El accountId del invocador.
   * @returns La información del invocador.
   * */
  public async getByAccountId(accountId: string): Promise<SummonerDTO | null> {
    const endpoint = `/lol/summoner/v4/summoners/by-account/${accountId}`;
    return this.request<SummonerDTO>(endpoint);
  }

  /**
   * Obtiene las estadísticas de ranked de un invocador.
   * @param summonerId - El id del invocador.
   * @returns La liga del invocador.
   * */
  public async getLeague(summonerId: string): Promise<LeagueEntryDTO | null> {
    const leagueService = new LeagueService(this.api);
    return leagueService.getLeagueBySummonerId(summonerId);
  }

  /**
   * Obtiene las maestrías de campeones de un invocador.
   * @param puuid - El puuid del invocador.
   * @returns Las maestrías de los campeones.
   */
  public async getChampionMasteries(
    puuid: string
  ): Promise<ChampionMasteriesDto | null> {
    const championMasteryService = new ChampionMasteryService(this.api);
    return championMasteryService.getChampionMasteriesByPuuid(puuid);
  }

  /**
   * Obtiene la maestría de un campeón de un invocador.
   * @param puuid - El puuid del invocador.
   * @param championId - El id del campeón.
   * @returns La maestría del campeón.
   */
  public async getChampionMastery(
    puuid: string,
    championId: number
  ): Promise<ChampionMasteryDto | null> {
    const championMasteryService = new ChampionMasteryService(this.api);
    return championMasteryService.getChampionMasteryByPuuidAndChampionId(
      puuid,
      championId
    );
  }

  /**
   * Obtiene las partidas de un invocador.
   * @param puuid - El puuid del invocador.
   * @param query - Los parámetros de la consulta.
   * @returns Las partidas del invocador.
   */
  public async getMatches(
    puuid: string,
    query: QueryParameters
  ): Promise<MatchDto[] | null> {
    const matchService = new MatchService(this.api);
    return matchService.getMatchList(puuid, query);
  }
}

interface QueryParameters {
  startTime: number;
  endTime: number;
  queue: number;
  type: string;
  start: number;
  count: number;
}
