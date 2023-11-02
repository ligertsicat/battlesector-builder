import Papa, { ParseResult } from "papaparse";
import { useState, useEffect } from "react";
import Unit from "./Unit";
import Weapon from "./Weapon";

type UnitData = {
  unit_type: string;
  name: string;
  weapon: string;
  points: string;
  unit_count: string;
  hp: string;
  armor: string;
  ap: string;
  mp: string;
  evasion: string;
  abilities: string;
  notes: string;
  weaponList: WeaponData[];
};

type WeaponData = {
  name: string;
  unit: string;
  attacks: string;
  damage_armor_pen: string;
  splash_damage: string;
  range_optimal: string;
  base_accuracy_falloff: string;
  ap_cost: string;
  ammo: string;
  cooldown: string;
  notes: string;
};

function FilterData(unitList: UnitData[], weaponList: WeaponData[]): Unit[] {
  //const [units, setUnits] = useState<Unit[]>([]);

  console.log(unitList, "FilterData called");
  const units: Unit[] = [];

  for (let i = 0; i < unitList.length - 1; i++) {
    const u = unitList[i];

    let targetUnit = units.find((obj) => obj.name === u.name);

    if (!targetUnit) {
      const tempUnit: Unit = {
        name: u.name,
        weapons: [],
        weapons_raw: [],
        points: u.points,
        unit_count: u.unit_count,
        hp: u.hp,
        armor: u.armor,
        ap: u.ap,
        mp: u.mp,
        evasion: u.evasion,
        abilities: [],
        abilities_raw: [],
        notes: u.notes,
      };

      units.push(tempUnit);
      targetUnit = tempUnit;
    }

    if (u.weapon != "") {
      targetUnit.weapons_raw.push(u.weapon);
    }

    if (u.abilities != "") {
      targetUnit.abilities_raw.push(u.abilities);
    }
  }

  for (let i = 0; i < weaponList.length - 1; i++) {
    const w = weaponList[i];
    const targetUnit = units.find((obj) => obj.name === w.unit);

    const tempWeapon: Weapon = {
      name: w.name,
      attacks: w.attacks,
      damage_armor_pen: w.damage_armor_pen,
      splash_damage: w.splash_damage,
      range_optimal: w.range_optimal,
      base_accuracy_falloff: w.base_accuracy_falloff,
      ap_cost: w.ap_cost,
      ammo: w.ammo,
      cooldown: w.cooldown,
    };

    if (targetUnit) {
      targetUnit.weapons.push(tempWeapon);
    }
  }
  console.log(units, "unit_result");

  return units;
}

export function ParseCSV(): Unit[] {
  const initValues: UnitData[] = [];
  const [unitList, setUnitList] = useState(initValues);

  const initWeaponValues: WeaponData[] = [];
  const [weaponList, setWeaponList] = useState(initWeaponValues);

  const getCSV = () => {
    Papa.parse("/data.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (results: ParseResult<UnitData>) => {
        setUnitList(results.data);
      },
    });

    Papa.parse("/weapon_data.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (results: ParseResult<WeaponData>) => {
        setWeaponList(results.data);
      },
    });
  };

  useEffect(() => {
    getCSV();
  }, []);

  return FilterData(unitList, weaponList);
}
