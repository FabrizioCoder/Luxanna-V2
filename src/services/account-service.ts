import { RiotApiWrapper } from '../core/riot-api-wrapper';
import { GetApiResponse } from 'src/config/types';

export class AccountService extends RiotApiWrapper {
  public async getAccountByRiotId(
    gameName: string,
    tagLine: string
  ): Promise<
    GetApiResponse<'/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}'>
  > {
    const endpoint = `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    return this.request<
      GetApiResponse<'/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}'>
    >(endpoint);
  }
}
