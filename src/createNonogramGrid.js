import { getRowHints, getColumnHints, removeElement, handleResize, musicSetting, checkPicture } from "./utils.js";
import { checkResult } from "./checkResult.js";

let leftClickBtn = new Audio("./music/clickBTN.mp3");
let rightClickBtn = new Audio("./music/right__button.mp3");
let comeBackMusic = new Audio("./music/comeBack.mp3");

export let startTime;
export let continueTime;
export let saveTime;
export function createNonogramGrid(arr, level, picture, savedPlayerGrid = null) {
  let lastArray = savedPlayerGrid;
  
  console.log(arr);
  // console.log(level);
  // console.log(picture);
  let newElementMain = document.querySelector(".wrapper");
  let newElementBtn = document.querySelector(".buttons__wrapper");
  if (newElementMain) {
    removeElement(newElementMain);
  }
  if (newElementBtn) {
    removeElement(newElementBtn);
  }

  // создание главной игровой площади
  const container = document.querySelector(".container");
  let secondRow = document.createElement("div");
  secondRow.classList.add("second__row");
  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  let boardMain = document.createElement("div");
  boardMain.classList.add("board__main");
  let wrapperMainBoard = document.createElement("div");
  wrapperMainBoard.classList.add("board__main-wrapper");

  for (let row = 0; row < arr.length; row++) {
    let boardRow = document.createElement("div");
    boardRow.classList.add("board__row");

    if ((row + 1) % 5 === 0) boardRow.classList.add("border__bottom");
    for (let col = 0; col < arr[row].length; col++) {
      const itemBoard = document.createElement("div");
      itemBoard.classList.add("board__item");
      itemBoard.setAttribute("data-row", row);
      itemBoard.setAttribute("data-col", col);
      boardRow.appendChild(itemBoard);
      if ((col + 1) % 5 === 0) itemBoard.classList.add("border__right");
      // провера с сохранённой игрой
      if (lastArray) {
        if (lastArray[row][col] === 1) {
          itemBoard.classList.add("bg__black");
        }
      }
    }
    wrapperMainBoard.appendChild(boardRow);
  }

  boardMain.appendChild(wrapperMainBoard);
  secondRow.appendChild(boardMain);
  wrapper.appendChild(secondRow);
  container.appendChild(wrapper);
  document.body.appendChild(container);

  const rowHints = getRowHints(arr);
  // console.log(rowHints);

  let maxRowHintLength = Math.max(...rowHints.map((h) => h.length));

  // создание левой вспомогательной "оси"
  const hintsWrapper = document.createElement("div");
  hintsWrapper.classList.add("hint__row");
  const leftHintsWrapper = document.createElement("div");
  leftHintsWrapper.classList.add("hint__row-wrapper");
  for (let i = 0; i < rowHints.length; i++) {
    let boardRowHint = document.createElement("div");
    boardRowHint.classList.add("hint__row-item");

    let emptyCell = maxRowHintLength - rowHints[i].length;

    if ((i + 1) % 5 === 0) {
      boardRowHint.classList.add("border__bottom");
    }
    // console.log(emptyCell);
    for (let k = 0; k < emptyCell; k++) {
      let emptyItem = document.createElement("div");
      emptyItem.classList.add("empty__item");
      boardRowHint.appendChild(emptyItem);
    }

    for (let j = 0; j < rowHints[i].length; j++) {
      let emptyItem = document.createElement("div");
      emptyItem.classList.add("empty__item");
      emptyItem.innerText = rowHints[i][j];
      boardRowHint.appendChild(emptyItem);
    }
    leftHintsWrapper.appendChild(boardRowHint);
  }

  hintsWrapper.appendChild(leftHintsWrapper);
  secondRow.prepend(hintsWrapper);
  wrapper.appendChild(secondRow);
  container.appendChild(wrapper);
  document.body.appendChild(container);

  // создание верхней вспомогательной "оси"

  const columnHints = getColumnHints(arr);
  const maxColumnHintLength = Math.max(...columnHints.map((h) => h.length));

  const hintColumn = document.createElement("div");
  hintColumn.classList.add("hint__column");
  const columnHintsWrapper = document.createElement("div");
  columnHintsWrapper.classList.add("hint__column-wrapper");

  setTimeout(() => {
    handleResize(maxRowHintLength);
  }, 0);

  for (let i = 0; i < columnHints.length; i++) {
    let boardColumnHint = document.createElement("div");
    boardColumnHint.classList.add("hint__column-item");

    let emptyCell = maxColumnHintLength - columnHints[i].length;
    for (let k = 0; k < emptyCell; k++) {
      let emptyItem = document.createElement("div");
      emptyItem.classList.add("empty__item");
      boardColumnHint.appendChild(emptyItem);
      if ((i + 1) % 5 === 0) emptyItem.classList.add("border__right");
      if (i === 0) boardColumnHint.classList.add("borger__left");
    }

    for (let j = 0; j < columnHints[i].length; j++) {
      let emptyItem = document.createElement("div");
      emptyItem.classList.add("empty__item");
      emptyItem.innerText = columnHints[i][j];
      boardColumnHint.appendChild(emptyItem);
      if ((i + 1) % 5 === 0) emptyItem.classList.add("border__right");
      if (i === 0) boardColumnHint.classList.add("borger__left");
    }
    columnHintsWrapper.appendChild(boardColumnHint);
  }

  hintColumn.appendChild(columnHintsWrapper);
  wrapper.prepend(hintColumn);
  container.appendChild(wrapper);
  document.body.appendChild(container);

  let checkWrapper = document.createElement("div");
  checkWrapper.classList.add("buttons__wrapper");

  let checkButton = document.createElement("button");
  checkButton.classList.add("buttons-general");
  checkButton.textContent = "Check";

  let resetButton = document.createElement("button");
  resetButton.classList.add("buttons-general");
  resetButton.textContent = "Reset Game";

  checkWrapper.appendChild(checkButton);
  checkWrapper.appendChild(resetButton);

  // wrapper.appendChild(checkWrapper);
  container.appendChild(checkWrapper);
  document.body.appendChild(container);

  let allBoardItems = Array.from(document.querySelectorAll(".board__item"));
  // let playerGrid = Array.from({ length: arr.length }, () => Array(arr.length).fill(0));

  let playerGrid;
  if (lastArray) {
    playerGrid = lastArray.map((row) => [...row]); // Копируем
  } else {
    playerGrid = Array.from({ length: arr.length }, () => Array(arr.length).fill(0));
  }

  checkButton.addEventListener("click", () => {
    checkResult(playerGrid, arr);
  });

  resetButton.addEventListener("click", () => {
    playerGrid = Array.from({ length: arr.length }, () => Array(arr.length).fill(0));
    allBoardItems.forEach((value) => {
      if (value.classList.contains("bg__black")) {
        value.classList.remove("bg__black");
      }
      if ((value.innerText = "X")) {
        value.innerText = "";
      }
    });
  });

  let firstTimeFlag = true;
  allBoardItems.forEach((value) => {
    value.addEventListener("click", (event) => {
      value.classList.toggle("bg__black");
      const row = Number(value.getAttribute("data-row"));
      const col = Number(value.getAttribute("data-col"));
      if (firstTimeFlag) {
        startTime = Date.now();
        // console.log(startTime);

        let saveGame = document.createElement("button");
        saveGame.classList.add("buttons-general");
        saveGame.textContent = "Save Game";
        checkWrapper.appendChild(saveGame);

        let continueGame = document.createElement("button");
        continueGame.classList.add("buttons-general");
        continueGame.textContent = "Resume Last";
        checkWrapper.appendChild(continueGame);

        saveGame.addEventListener("click", () => {
          const savedGame = localStorage.getItem("savedGame");
          if (localStorage.getItem("savedGame") !== null) {
            const gameState = JSON.parse(savedGame);
            saveTime = Date.now() - startTime + gameState.time;
          } else {
            saveTime = Date.now() - startTime;
          }

          let gameState = {
            difficulty: level,
            resultPicture: picture,
            arrAnswer: arr,
            lastVersionArr: playerGrid,
            time: saveTime,
          };
          localStorage.setItem("savedGame", JSON.stringify(gameState));
          wrapper.remove();
          checkWrapper.remove();
          checkPicture();
        });

        continueGame.addEventListener("click", () => {
          const savedGame = localStorage.getItem("savedGame");
          const gameState = JSON.parse(savedGame);

          // // меняем значение уровня
          const select = document.querySelector(".menu__levels");
          select.value = gameState.difficulty;

          // меняем значеие картинки
          let chooseSelected = document.querySelector(".choose__selected");
          chooseSelected.innerText = `${gameState.resultPicture}  ▼`;

          wrapper.remove();
          checkWrapper.remove();

          createNonogramGrid(
            gameState.arrAnswer,
            gameState.difficulty,
            gameState.resultPicture,
            gameState.lastVersionArr
          );
          console.log(gameState);
        });

        firstTimeFlag = false;
      }
      if (playerGrid[row][col] === 1) {
        playerGrid[row][col] = 0;
        musicSetting(comeBackMusic);
      } else {
        playerGrid[row][col] = 1;
        musicSetting(leftClickBtn);
      }
    });
  });

  allBoardItems.forEach((value) => {
    value.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    value.addEventListener("mousedown", (event) => {
      if (!value.innerText) {
        if (event.button === 2) {
          value.innerText = "X";
          musicSetting(rightClickBtn);
        }
      } else {
        if (event.button === 2) {
          value.innerText = "";
          musicSetting(comeBackMusic);
        }
      }
    });
  });

  return maxRowHintLength;
}

// localStorage.removeItem("savedGame");
