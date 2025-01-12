import { RiotApiWrapper } from '../core/riot-api-wrapper';
import { GetApiResponse } from 'src/config/types';

export class SummonerService extends RiotApiWrapper {
  /**
   * Obtiene la información de un invocador por su puuid.
   * @param puuid - El puuid del invocador.
   * @returns La información del invocador.
   * */
  public async getSummonerByPuuid(
    puuid: string
  ): Promise<
    GetApiResponse<'/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}'>
  > {
    const endpoint = `/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    return this.request<
      GetApiResponse<'/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}'>
    >(endpoint);
  }

  /**
   * Obtiene la información de un invocador por su accountId.
   * @param accountId - El accountId del invocador.
   * @returns La información del invocador.
   * */
  public async getSummonerByAccountId(
    accountId: string
  ): Promise<
    GetApiResponse<'/lol/summoner/v4/summoners/by-account/{encryptedAccountId}'>
  > {
    const endpoint = `/lol/summoner/v4/summoners/by-account/${accountId}`;
    return this.request<
      GetApiResponse<'/lol/summoner/v4/summoners/by-account/{encryptedAccountId}'>
    >(endpoint);
  }
}
