import type { paths } from '../types/riot-api';
export type ApiResponseTypes<P extends keyof paths> =
  paths[P]['get'] extends never
  ? never
  : paths[P]['get'] extends {
    responses: { 200: { content: { 'application/json': infer R } } };
  }
  ? R
  : never;
export interface Ratelimit {
  type: 'channel' | 'user';
  time: number;
}
