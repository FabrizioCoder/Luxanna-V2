import { paths } from '../types/riot-api';
export type GetApiResponse<P extends keyof paths> =
  paths[P]['get'] extends never
    ? undefined
    : paths[P]['get'] extends {
          responses: { 200: { content: { 'application/json': infer R } } };
        }
      ? R
      : never;
export interface Ratelimit {
  type: 'user' | 'channel';
  time: number;
}
