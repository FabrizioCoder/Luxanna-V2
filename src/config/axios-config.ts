import type { AxiosInstance, } from 'axios';

import axiosRetry from 'axios-retry';
import axios from 'axios';

import type {
  PlatformRegion,
  RegionalRegion,
} from './regions';

import {
  PLATFORM_REGIONS,
  REGIONAL_REGIONS,
} from './regions';

/**
 * Crea una instancia de Axios para la plataforma especificada.
 */
export function createPlatformAxiosInstance(
  platformRegion: PlatformRegion
): AxiosInstance {
  validatePlatformRegion(platformRegion);
  validateApiKey();

  return createAxiosInstance(PLATFORM_REGIONS[platformRegion]);
}

/**
 * Crea una instancia de Axios para la región regional especificada.
 */
export function createRegionalAxiosInstance(
  regionalRegion: RegionalRegion
): AxiosInstance {
  validateRegionalRegion(regionalRegion);
  validateApiKey();

  return createAxiosInstance(REGIONAL_REGIONS[regionalRegion]);
}

/**
 * Crea una instancia de Axios con la URL base proporcionada.
 */
function createAxiosInstance(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL: `https://${baseURL}`,
    headers: {
      'X-Riot-Token': process.env.RIOT_API_KEY,
    },
  });

  // Configurar reintentos automáticos
  axiosRetry(instance, {
    retries: 3,
    retryCondition: (error) => error.response?.status === 429 || error.response!.status >= 500,
    retryDelay: (retryCount) => retryCount * 1_000,
  });

  return instance;
}

/**
 * Valida que la región de la plataforma sea válida.
 */
function validatePlatformRegion(platformRegion: PlatformRegion): void {
  if (!(platformRegion in PLATFORM_REGIONS)) {
    throw new Error(`Invalid platform region: ${platformRegion}`);
  }
}

/**
 * Valida que la región regional sea válida.
 */
function validateRegionalRegion(regionalRegion: RegionalRegion): void {
  if (!(regionalRegion in REGIONAL_REGIONS)) {
    throw new Error(`Invalid regional region: ${regionalRegion}`);
  }
}

/**
 * Valida que la clave de API esté definida.
 */
function validateApiKey(): void {
  if (!process.env.RIOT_API_KEY) {
    throw new Error(
      'Riot API key is not defined in the environment variables.'
    );
  }
}
