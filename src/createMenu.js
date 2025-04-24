import { createPictureMenu } from "./createPictureMenu.js";
import { puzzles } from "./puzzles.js";


export function createMenu() {
  const container = document.createElement("div");
  container.classList.add("container");

  const menuWrapper = document.createElement("div");
  menuWrapper.classList.add("menu__wrapper");

  const label = document.createElement("label");
  label.setAttribute("for", "level");
  label.classList.add("level__text");
  label.textContent = "Select difficulty :";

  const select = document.createElement("select");
  select.id = "level";
  select.classList.add("menu__levels");

  const disableOption = document.createElement("option");
  disableOption.textContent = "Levels";
  disableOption.disabled = true;
  disableOption.selected = true;

  // Создаем option элементы
  const easyOption = document.createElement("option");
  easyOption.classList.add("easy__level", "level__generation");
  easyOption.textContent = "Easy";

  const middleOption = document.createElement("option");
  middleOption.classList.add("middle__level", "level__generation");
  middleOption.textContent = "Middle";

  const hardOption = document.createElement("option");
  hardOption.classList.add("hard__level", "level__generation");
  hardOption.textContent = "Hard";

  select.appendChild(disableOption);
  select.appendChild(easyOption);
  select.appendChild(middleOption);
  select.appendChild(hardOption);

  menuWrapper.appendChild(label);
  menuWrapper.appendChild(select);

  container.appendChild(menuWrapper);


  const chooseRow=document.createElement('div');
  chooseRow.classList.add('choose__row');

  const choosePicture = document.createElement("div");
  choosePicture.textContent = "Now choose the kind of result you’d like to see :";
  choosePicture.classList.add("none", "choose__result");

  chooseRow.appendChild(choosePicture)
  container.appendChild(chooseRow);

  document.body.appendChild(container);

  select.addEventListener("change", (event) => {
    choosePicture.classList.remove("none");
    const currentValue = event.target.value;
    if (currentValue === "Easy") {
      createPictureMenu(puzzles.easy)
    } else if (currentValue === "Middle") {
      createPictureMenu(puzzles.middle)
    } else {
      createPictureMenu(puzzles.hard)
    }
  });
}
