import { useState } from "react";
import Button from "./Button";
import UnitButton2 from "./UnitButton2";
import Unit from "./Unit";
import Weapon from "./Weapon";
import CustomTooltip from "./Tooltip";
import RadioObjectDisplay from "./components/RadioObjectDisplay";
import ListObjects from "./components/ListObjects";

function App() {
  const [selectedArmy, setSelectedArmy] = useState(-1);

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
      name: "HiveTyrant",
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
        <div class="title"></div>

        <div class="columns-3">
          <div class="">
            <div class="card">
              <div id="component">
                <div class="options">
                  <div class="btns">
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
                      <button id="btn-0" class="scifi_button">
                        Hive Tyrant
                      </button>
                      <button id="btn-0" class="scifi_button">
                        +
                      </button>
                      <button id="btn-0" class="scifi_button">
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="description">
              <h1>Available Units</h1>
              <p>Description</p>
            </div>
          </div>
          <div class="bg-piznk">
            <h1>
              Viewing unit:{" "}
              {RenderUnitView(
                unitList,
                armyList,
                viewUnit,
                viewArmyUnit,
                onWeaponSelectEmit
              )}
            </h1>
          </div>
          <div class="bg-zorange">
            <div class="card">
              <div id="component"></div>
              <div class="options">
                <div class="btns">
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

            <div class="description">
              <h1>Army List</h1>
              <p>Description</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm">
          Units
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
                className="btn btn-secondary"
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
                className="btn btn-secondary custom-buffered-button"
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
        </div>

        <div className="col-sm">
          <h1>
            Viewing unit:{" "}
            {RenderUnitView(
              unitList,
              armyList,
              viewUnit,
              viewArmyUnit,
              onWeaponSelectEmit
            )}
          </h1>
        </div>

        <div className="col-sm">
          Army List
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
                className="btn btn-secondary"
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
      <div>{unit.name}</div>
      <div>hp: {unit.hp}</div>
      <div>unit members: {unit.unit_members}</div>
      <div>action points: {unit.action_points}</div>
      <div>weapon selected {unit.weapon_selected}</div>
      <div>
        <h1>Radio Text Switch Example </h1>
        <RadioObjectDisplay
          data={unit.weapons}
          selected={unit.weapon_selected}
          onDataEmit={handleWeaponSelectEmit}
        />
      </div>
    </div>
  );
}

export default App;
