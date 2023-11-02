import { useState } from "react";
import UnitButton2 from "./UnitButton2";
import Unit from "./Unit";
import { ParseCSV } from "./ParseCSV";
import RadioObjectDisplay from "./components/RadioObjectDisplay";
import jsonData from "./data.json";
import bloodAngelUnits from "./data_bloodangel.json";
import necronUnits from "./data_necrons.json";
import sistersofbattleUnits from "./data_sob.json";
import orkUnits from "./data_orks.json";

function App() {
  const [selectedValue, setSelectedValue] = useState("0");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);

    if (event.target.value === "0") {
      setUnitList(jsonData);
    }
    if (event.target.value === "1") {
      setUnitList(bloodAngelUnits);
    }
    if (event.target.value === "2") {
      setUnitList(necronUnits);
    }
    if (event.target.value === "3") {
      setUnitList(sistersofbattleUnits);
    }
    if (event.target.value === "4") {
      setUnitList(orkUnits);
    }

    setarmyList([]);
    setPoints(0);
    setUnitCount(0);
  };

  const unitList2 = ParseCSV();
  console.log(JSON.stringify(unitList2));

  const [unitList, setUnitList] = useState(jsonData);

  const initArmy: Unit[] = [];
  const [armyList, setarmyList] = useState(initArmy);

  const [viewUnit, setViewUnit] = useState(0);
  const [viewArmyUnit, setviewArmyUnit] = useState(0);

  const [points, setPoints] = useState(0);
  const [unitCount, setUnitCount] = useState(0);

  const onWeaponSelectEmit = (data: number) => {
    //viewUnit.weapon_selected = data;

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
            <select
              className="form-select armySelect"
              aria-label="Default select example"
              onChange={handleSelectChange}
              value={selectedValue}
            >
              <option selected value="0">
                Tyranids
              </option>
              <option value="1">Blood Angels</option>
              <option value="2">Necrons</option>
              <option value="3">Sisters of Battle</option>
              <option value="4">Orks</option>
            </select>
            <div className="card overflow-auto">
              <div id="component">
                <div className="options">
                  <div className="btns">
                    {unitList.map((object, index) => (
                      <div>
                        <UnitButton2
                          text={truncate(object.name, 15)}
                          onClick={() => {
                            setViewUnit(index);
                            setviewArmyUnit(-1);
                          }}
                        />
                        <button
                          type="button"
                          className="scifi_button_small"
                          onClick={() => {
                            const myunit: Unit = {
                              ...unitList[index],
                            };
                            setarmyList([...armyList, myunit]);
                            setPoints(
                              points + parseInt(unitList[index].points)
                            );
                            setUnitCount(unitCount + 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="description">
              <h1>Available Units</h1>
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
            <h1 className="points">
              {points}/2000 Points {unitCount}/30 Units
            </h1>
            <div className="card overflow-auto">
              <div id="component">
                <div className="options">
                  <div className="btns">
                    {armyList.map((object, index) => (
                      <div>
                        <UnitButton2
                          text={truncate(object.name, 15)}
                          onClick={() => {
                            setviewArmyUnit(index);
                            setViewUnit(-1);
                          }}
                        />
                        <button
                          type="button"
                          className="scifi_button_small"
                          onClick={() => {
                            setPoints(
                              points - parseInt(armyList[index].points)
                            );
                            setUnitCount(unitCount - 1);
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
            </div>

            <div className="description">
              <h1>Army List</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function truncate(str: string, maxlength: number) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
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

  if (!unit) {
    return;
  }

  return (
    <div>
      <h1>{unit.name}</h1>
      <p>{unit.faction}</p>
      <div>{unit.points} PT</div>
      <div className="left-align">
        <div className="stat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 0 512 512"
          >
            <rect
              fill="#000000"
              fill-opacity="0.00001"
              height="512"
              width="512"
              rx="32"
              ry="32"
            ></rect>
            <g transform="translate(2,1)">
              <path
                d="M196 16a30 30 0 0 0-30 30v120H46a30 30 0 0 0-30 30v120a30 30 0 0 0 30 30h120v120a30 30 0 0 0 30 30h120a30 30 0 0 0 30-30V346h120a30 30 0 0 0 30-30V196a30 30 0 0 0-30-30H346V46a30 30 0 0 0-30-30H196z"
                fill="#7ed321"
                fill-opacity="1"
              ></path>
            </g>
          </svg>
          HP: {unit.hp}
        </div>
        <div className="stat">
          <svg
            height="30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <rect
              fill="#000000"
              fill-opacity="0.00001"
              height="512"
              width="512"
              rx="32"
              ry="32"
            ></rect>
            <g transform="translate(2,1)">
              <path
                d="M389 40.84c18.5 0 35 18.79 35 44.03 0 25.33-16.5 44.03-35 44.03s-35-18.7-35-44.03c0-25.24 16.5-44.03 35-44.03zm-132.9 0c18.4 0 35 18.79 35 44.03 0 25.33-16.6 44.03-35 44.03-18.5 0-35.1-18.7-35.1-44.03 0-25.24 16.6-44.03 35.1-44.03zm-133 0c18.5 0 35 18.79 35 44.03 0 25.33-16.5 44.03-35 44.03s-35.09-18.7-35.09-44.03c0-25.24 16.59-44.03 35.09-44.03zm133 109.06c64 2 118 2 182.8 4.2 30.9 17.8 45.2 109 44.3 140.7l-17.6 17.7c-7.7-42.8-17.4-99.9-33.5-112.6v87.6l4.1 183.7H414l-16.7-184.7h-18l-16.7 184.7h-22.3l4.2-183.7-8-88.5h-29.3l-7.2 88.2 4.2 183.7h-22.3l-16.8-184.7h-18l-16.8 184.7h-22.2l4.2-183.7L205 199h-29.3l-8 88.5 4.2 183.7h-22.3l-16.7-184.7h-18L98.01 471.2h-22.2l4.2-183.7v-87.6c-16.2 12.7-25.9 69.8-33.6 112.6l-17.6-17.7c-.9-31.7 13.5-122.9 44.3-140.7 64.99-2.2 118.99-2.2 182.99-4.2z"
                fill="#f5a623"
                fill-opacity="1"
              ></path>
            </g>
          </svg>
          Unit members: {unit.unit_count}
        </div>
        <div className="stat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 0 512 512"
          >
            <rect
              fill="#000000"
              fill-opacity="0.00001"
              height="512"
              width="512"
              rx="32"
              ry="32"
            ></rect>
            <g transform="translate(2,1)">
              <path
                d="M329.8 235.69l62.83-82.71 42.86 32.56-62.83 82.75zm-12.86-9.53l66.81-88-45-34.15-66.81 88zm-27.48-97.78l-19.3 39.57 57-75-42.51-32.3-36.24 47.71zm-20.74-73.24l-46.64-35.43-42 55.31 53.67 26.17zm107 235.52l-139-102.71-9.92.91 4.56 2 62.16 138.43-16.52 2.25-57.68-128.5-40-17.7-4-30.84 39.41 19.42 36.36-3.33 17-34.83-110.9-54.09-80.68 112.51L177.6 346.67l-22.7 145.62H341V372.62l35.29-48.93L387 275.77z"
                fill="#d7c69f"
                fill-opacity="0"
                stroke="#d0021b"
                stroke-opacity="1"
                stroke-width="32"
              ></path>
            </g>
          </svg>
          Action points: {unit.ap}
        </div>

        <div className="stat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 0 512 512"
          >
            <rect
              fill="#000000"
              fill-opacity="0.00001"
              height="512"
              width="512"
              rx="32"
              ry="32"
            ></rect>
            <g className="" transform="translate(2,1)">
              <path
                d="M256 16c25 24 100 72 150 72v96c0 96-75 240-150 312-75-72-150-216-150-312V88c50 0 125-48 150-72z"
                fill="#d7c69f"
                fill-opacity="0"
                stroke="#48baff"
                stroke-opacity="1"
                stroke-width="48"
              ></path>
            </g>
          </svg>
          Armor: {unit.armor}
        </div>
        <div className="stat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 0 512 512"
          >
            <rect
              fill="#000000"
              fill-opacity="0.00001"
              height="512"
              width="512"
              rx="32"
              ry="32"
            ></rect>
            <g transform="translate(2,1)">
              <path
                d="M256 34.47l-90.51 90.51h67.883v108.393H124.98V165.49L34.47 256l90.51 90.51v-67.883h108.393V387.02H165.49L256 477.53l90.51-90.51h-67.883V278.627H387.02v67.883L477.53 256l-90.51-90.51v67.883H278.627V124.98h67.883L256 34.47z"
                fill="#4a90e2"
                fill-opacity="1"
              ></path>
            </g>
          </svg>
          Movement points: {unit.mp}
        </div>
        <div className="stat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 0 512 512"
          >
            <rect
              fill="#000000"
              fill-opacity="0.00001"
              height="512"
              width="512"
              rx="32"
              ry="32"
            ></rect>
            <g transform="translate(2,1)">
              <path
                d="M135.3 38.88L25.22 73.93l74.73 87.97 12.75-44.5c44.9 15 73.8 35.5 91.6 58.3 20.6 26.2 27.5 56.2 25.7 88.9-3.6 65.4-45.7 139.7-83.8 185.5l27.6 23c31.7-37.9 65.6-91.6 82.2-149.5 16.6 57.9 50.5 111.6 82.2 149.5l27.6-23C327.7 404.3 285.6 330 282 264.6c-1.8-32.7 5.1-62.7 25.7-88.9 17.8-22.8 46.7-43.3 91.5-58.3l12.8 44.5 74.8-87.97-110.1-35.05 12.6 43.94c-50.8 16.8-86.7 40.98-110 70.68-10.3 13.2-17.9 27.2-23.3 41.9-5.4-14.7-13-28.7-23.3-41.9-23.3-29.7-59.2-53.88-110-70.68z"
                fill="#d7c69f"
                fill-opacity="0"
                stroke="#f8e71c"
                stroke-opacity="1"
                stroke-width="32"
              ></path>
            </g>
          </svg>
          Evasion: {unit.evasion}
        </div>
        <br></br>
        <div className="stat">Abilites: </div>
        <div>
          <ul>
            {unit.abilities_raw.map((item, index) => (
              <li className="abilities" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <br></br>
        <div className="stat">Weapons: </div>
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
