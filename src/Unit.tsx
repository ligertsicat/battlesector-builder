import Weapon from "./Weapon";
import Ability from "./Ability";

type Unit = {
  name: string;
  weapons: Weapon[];
  weapons_raw: string[];
  points: string;
  unit_count: string;
  hp: string;
  armor: string;
  ap: string;
  mp: string;
  evasion: string;
  abilities: Ability[];
  abilities_raw: string[];
  notes: string;

  unit_type?: string;
  weapon_selected?: number;
  faction?: string;
};

export default Unit;
