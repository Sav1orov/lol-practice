interface IChampion {
  id: number;
  slug: string;
  name: string;
  title: string;
  role: TChampionRole;
  difficulty: number;
  image: string;
  summary: string;
  builds: IChampionBuild[];
}

interface IChampionBuild {
  style: TPlayStyle;
  primaryPath: TPrimaryPath;
  primaryRunes: string[];
  secondaryPath: string;
  secondaryRunes: string[];
  summonerSpells: TSummonerSpells[];
  explanation: string;
}

type TChampionRole = "top" | "jungle" | "mid" | "adc" | "support";

type TPrimaryPath = "Sorcery" | "Domination" | "Resolve" | "Precision";

type TPlayStyle = "safe" | "standard" | "aggressive";

type TSummonerSpells =
  | "Flash"
  | "Teleport"
  | "Ignite"
  | "Barrier"
  | "Heal"
  | "Execute"
  | "Ghost";

export type { IChampion, TChampionRole, TPlayStyle };
