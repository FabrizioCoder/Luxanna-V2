export const PLATFORM_REGIONS = {
  BR1: 'br1.api.riotgames.com',
  EUN1: 'eun1.api.riotgames.com',
  EUW1: 'euw1.api.riotgames.com',
  JP1: 'jp1.api.riotgames.com',
  KR: 'kr.api.riotgames.com',
  LA1: 'la1.api.riotgames.com',
  LA2: 'la2.api.riotgames.com',
  NA1: 'na1.api.riotgames.com',
  OC1: 'oc1.api.riotgames.com',
  TR1: 'tr1.api.riotgames.com',
  RU: 'ru.api.riotgames.com',
  PH2: 'ph2.api.riotgames.com',
  SG2: 'sg2.api.riotgames.com',
  TH2: 'th2.api.riotgames.com',
  TW2: 'tw2.api.riotgames.com',
  VN2: 'vn2.api.riotgames.com',
} as const;

export const REGIONAL_REGIONS = {
  AMERICAS: 'americas.api.riotgames.com',
  ASIA: 'asia.api.riotgames.com',
  EUROPE: 'europe.api.riotgames.com',
  SEA: 'sea.api.riotgames.com',
} as const;

export const FORMATTED_PLATFORM_REGIONS = {
  BR1: 'Brazil',
  EUN1: 'Europe Nordic & East',
  EUW1: 'Europe West',
  JP1: 'Japan',
  KR: 'Korea',
  LA1: 'Latin America North',
  LA2: 'Latin America South',
  NA1: 'North America',
  OC1: 'Oceania',
  TR1: 'Turkey',
  RU: 'Russia',
  PH2: 'Philippines',
  SG2: 'Singapore',
  TH2: 'Thailand',
  TW2: 'Taiwan',
  VN2: 'Vietnam',
} as const;

export function PLATFORM_TO_REGIONAL(platformRegion: PlatformRegion): RegionalRegion {
  switch (platformRegion) {
    case 'BR1':
    case 'LA1':
    case 'LA2':
    case 'NA1':
    case 'OC1':
    case 'TR1':
    case 'RU':
    case 'PH2':
    case 'SG2':
    case 'TH2':
    case 'TW2':
    case 'VN2':
      return 'AMERICAS';
    case 'EUN1':
    case 'EUW1':
    case 'JP1':
    case 'KR':
      return 'EUROPE';
    default:
      return 'ASIA';
  }
}

export type PlatformRegion = keyof typeof PLATFORM_REGIONS;
export type RegionalRegion = keyof typeof REGIONAL_REGIONS;
export type FormattedPlatformRegion = keyof typeof FORMATTED_PLATFORM_REGIONS;
