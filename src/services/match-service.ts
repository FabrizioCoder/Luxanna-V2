import { RiotApiWrapper } from '../core/riot-api-wrapper';
import { ApiResponseTypes } from 'src/config/types';

export class MatchService extends RiotApiWrapper {
  public async getMatchById(
    matchId: string
  ): Promise<ApiResponseTypes<'/lol/match/v5/matches/{matchId}'> | null> {
    const endpoint = `/lol/match/v5/matches/${matchId}`;
    return this.request<ApiResponseTypes<'/lol/match/v5/matches/{matchId}'>>(
      endpoint
    );
  }
}
