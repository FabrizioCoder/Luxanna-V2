import type { ApiResponseTypes, } from 'src/config/types';

import { RiotApiWrapper, } from '../core/riot-api-wrapper';

export class AccountService extends RiotApiWrapper {
  public async getAccountByRiotId(
    riotId: string
  ): Promise<ApiResponseTypes<'/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}'> | null> {
    const [gameName, tagLine,] = riotId.split('#');
    const endpoint = `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    return this.request<
      ApiResponseTypes<'/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}'>
    >(endpoint);
  }
}
