import { RiotApiWrapper } from '../core/riot-api-wrapper';
import { GetApiResponse } from 'src/config/types';

export class MatchService extends RiotApiWrapper {
  public async getMatchById(
    matchId: string
  ): Promise<GetApiResponse<'/lol/match/v5/matches/{matchId}'>> {
    const endpoint = `/lol/match/v5/matches/${matchId}`;
    return this.request<GetApiResponse<'/lol/match/v5/matches/{matchId}'>>(
      endpoint
    );
  }
}
