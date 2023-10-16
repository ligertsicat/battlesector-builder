import Weapon from "./Weapon";

type Unit = {
  name: string;
  faction: string;
  points: number;
  hp: number;
  unit_members: number;
  action_points: number;
  movement_points: number;
  weapons: Weapon[];
  weapon_selected: number;
  abilities: string[];
};

export default Unit;
