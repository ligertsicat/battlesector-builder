import { useState, useEffect } from "react";
import UnitButton2 from "./UnitButton2";
import Unit from "./Unit";
import Weapon from "./Weapon";
import RadioObjectDisplay from "./components/RadioObjectDisplay";
import Papa, { ParseResult } from "papaparse";

type UnitData = {
  unit_type: string;
  name: string;
  weapon: string;
  points: number;
  unit_count: number;
  hp: number;
  armor: number;
  ap: number;
  mp: number;
  evasion: number;
  abilities: string;
  notes: string;
  weaponList: WeaponData[];
};

type WeaponData = {
  name: string;
  unit: string;
  attacks: string;
  damage_armor_pen: number;
  splash_damage: number;
  range_optimal: number;
  armor: number;
  base_accuracy_falloff: number;
  ap_cost: number;
  ammo: number;
  cooldown: string;
  notes: string;
};

//unit_type,unit_name,weapon,points,unit_count,hp,armor,ap,mp,evasion,abilities,notes

function App() {
  const initValues: UnitData[] = [];
  const [unitList2, setUnitList2] = useState(initValues);

  const initWeaponValues: WeaponData[] = [];
  const [weaponList, setWeaponList] = useState(initWeaponValues);

  const getCSV = () => {
    Papa.parse("/data.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (results: ParseResult<UnitData>) => {
        setUnitList2(results.data);
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

  console.log(weaponList);
  console.log("weaponList2");

  for (let i = 0; i < unitList2.length - 1; i++) {
    const initWeaponData: WeaponData[] = [];
    unitList2[i].weaponList = initWeaponData;
    for (let j = 0; j < weaponList.length - 1; j++) {
      console.log(unitList2);

      if (unitList2[i].name === weaponList[j].unit) {
        console.log("yay", unitList2[i].name);
        unitList2[i].weaponList.push(weaponList[j]);
      }
    }
  }

  console.log(unitList2);
  console.log("unitList2");

  //const [selectedArmy, setSelectedArmy] = useState(-1);

  const Claws: Weapon = {
    name: "claws",
    damage: 10,
  };

  const Fangs: Weapon = {
    name: "fangs",
    damage: 11,
  };

  const initUnitList: Unit[] = [
    {
      name: "Hive Tyrant",
      faction: "Tyranids",
      points: 400,
      hp: 300,
      unit_members: 1,
      action_points: 1,
      movement_points: 4,
      weapon_selected: 0,
      weapons: [Claws, Fangs],
      abilities: [],
    },
    {
      name: "Termagaunt",
      faction: "Tyranids",
      points: 30,
      hp: 300,
      unit_members: 1,
      action_points: 1,
      movement_points: 4,
      weapon_selected: 0,
      weapons: [Claws],
      abilities: [],
    },
  ];
  const [unitList, setUnitList] = useState(initUnitList);

  const initArmy: Unit[] = [];
  const [armyList, setarmyList] = useState(initArmy);

  const [viewUnit, setViewUnit] = useState(0);
  const [viewArmyUnit, setviewArmyUnit] = useState(0);

  const [weaponSelected, setWeaponSelected] = useState(0);

  const onWeaponSelectEmit = (data: number) => {
    //viewUnit.weapon_selected = data;
    setWeaponSelected(data);

    setUnitList(
      unitList.map((item, index) => {
        if (viewUnit === index) {
          return { ...item, weapon_selected: data }; // Create a new object with the updated property
        }
        return item; // For other items, return them as they are
      })
    );

    setarmyList(
      armyList.map((item, index) => {
        if (viewArmyUnit === index) {
          return { ...item, weapon_selected: data }; // Create a new object with the updated property
        }
        return item; // For other items, return them as they are
      })
    );
  };

  return (
    <div className="container">
      <div id="shot">
        <div className="title"></div>

        <div className="columns-3">
          <div className="column1">
            <div className="card">
              <div id="component">
                <div className="options">
                  <div className="btns">
                    {unitList.map((object, index) => (
                      <div>
                        <UnitButton2
                          text={object.name}
                          onClick={() => {
                            setViewUnit(index);
                            setviewArmyUnit(-1);
                          }}
                        />
                        <button
                          type="button"
                          className="scifi_button"
                          onClick={() => {
                            const myunit: Unit = {
                              ...unitList[index],
                              name: "nid1",
                              weapon_selected: weaponSelected,
                            };
                            setarmyList([...armyList, myunit]);
                          }}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="scifi_button custom-buffered-button"
                          onClick={() => {
                            for (let i = armyList.length - 1; i >= 0; --i) {
                              if (armyList[i].name == object.name) {
                                armyList.splice(i, 1);
                                break;
                              }
                            }
                            setarmyList([...armyList]);
                          }}
                        >
                          -
                        </button>
                      </div>
                    ))}

                    <div>
                      <button id="btn-0" className="scifi_button">
                        Hive Tyrant
                      </button>
                      <button id="btn-0" className="scifi_button">
                        +
                      </button>
                      <button id="btn-0" className="scifi_button">
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="description">
              <h1>Available Units</h1>
              <p>Description</p>
            </div>
          </div>
          <div className="column2">
            <h2>
              {RenderUnitView(
                unitList,
                armyList,
                viewUnit,
                viewArmyUnit,
                onWeaponSelectEmit
              )}
            </h2>
          </div>
          <div className="column3">
            <div className="card">
              <div id="component"></div>
              <div className="options">
                <div className="btns">
                  {armyList.map((object, index) => (
                    <div>
                      <UnitButton2
                        text={object.name}
                        onClick={() => {
                          setviewArmyUnit(index);
                          setViewUnit(-1);
                        }}
                      />
                      <button
                        type="button"
                        className="scifi_button"
                        onClick={() => {
                          armyList.splice(index, 1);
                          console.log(armyList);
                          setarmyList([...armyList]);
                        }}
                      >
                        -
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="description">
              <h1>Army List</h1>
              <p>Description</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderUnitView(
  unitList: Unit[],
  armyList: Unit[],
  viewUnit: number,
  viewArmyUnit: number,
  onWeaponSelectEmit: (data: number) => void
) {
  const handleWeaponSelectEmit = (data: number) => {
    onWeaponSelectEmit(data);
  };

  let unit: Unit;
  if (viewUnit != -1) {
    unit = unitList[viewUnit];
  } else if (viewArmyUnit != -1) {
    unit = armyList[viewArmyUnit];
  } else {
    return;
  }

  console.log(armyList, viewArmyUnit, unit);
  return (
    <div>
      <h1>{unit.name}</h1>
      <p>{unit.faction}</p>
      <div>{unit.points} PT</div>
      <div className="left-align">
        <div className="stat">HP: {unit.hp}</div>
        <div className="stat">Unit members: {unit.unit_members}</div>
        <div className="stat">Action points: {unit.action_points}</div>
        <div className="stat">Weapon selected {unit.weapon_selected}</div>
        <div>
          <RadioObjectDisplay
            data={unit.weapons}
            selected={unit.weapon_selected}
            onDataEmit={handleWeaponSelectEmit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
