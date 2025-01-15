export interface ChampionData {
    stats: {
        attackdamageperlevel: number;
        attackspeedperlevel: number;
        spellblockperlevel: number;
        hpregenperlevel: number;
        mpregenperlevel: number;
        armorperlevel: number;
        attackdamage: number;
        critperlevel: number;
        attackspeed: number;
        attackrange: number;
        hpperlevel: number;
        spellblock: number;
        mpperlevel: number;
        movespeed: number;
        hpregen: number;
        mpregen: number;
        armor: number;
        crit: number;
        hp: number;
        mp: number;
    };
    image: {
        sprite: string;
        group: string;
        full: string;
        x: number;
        y: number;
        w: number;
        h: number;
    };
    info: {
        difficulty: number;
        defense: number;
        attack: number;
        magic: number;
    };
    partype: string;
    version: string;
    tags: string[];
    title: string;
    blurb: string;
    name: string;
    key: string;
    id: string;
}
