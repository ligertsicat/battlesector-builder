import Weapon from "./Weapon";
import Ability from "./Ability";

type Unit = {
  name: string;
  weapons: Weapon[];
  weapons_raw: string[];
  points: number;
  unit_count: number;
  hp: number;
  armor: number;
  ap: number;
  mp: number;
  evasion: number;
  abilities: Ability[];
  abilities_raw: string[];
  notes: string;

  unit_type?: string;
  weapon_selected?: number;
  faction?: string;
};

export default Unit;
