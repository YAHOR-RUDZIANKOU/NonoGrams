import { getRowHints, getColumnHints, removeElement, handleResize } from "./utils.js";
import { checkResult } from "./checkResult.js";

export let startTime;
export function createNonogramGrid(arr) {
  console.log(arr);
  let newElementMain = document.querySelector(".wrapper");
  if (newElementMain) {
    removeElement(newElementMain);
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
  // console.log(columnHints);
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
  checkWrapper.classList.add("check__result-wrapper");
  let checkButton = document.createElement("button");
  checkButton.classList.add("check__result-btn");
  checkButton.textContent = "Check";

  checkWrapper.appendChild(checkButton);
  wrapper.appendChild(checkWrapper);
  container.appendChild(wrapper);
  document.body.appendChild(container);

  let allBoardItems = Array.from(document.querySelectorAll(".board__item"));
  const playerGrid = Array.from({ length: arr.length }, () => Array(arr.length).fill(0));

  checkButton.addEventListener("click", () => {
    checkResult(playerGrid, arr);
  });

  console.log(playerGrid);

  let firstTimeFlag=true;
  allBoardItems.forEach((value) => {
    value.addEventListener("click", (event) => {
      value.classList.toggle("bg__black");
      const row = Number(value.getAttribute("data-row"));
      const col = Number(value.getAttribute("data-col"));
      if(firstTimeFlag){
        startTime=Date.now();
        firstTimeFlag=false;
      }
      // console.log(row);
      // console.log(col);
      if (playerGrid[row][col] === 1) {
        playerGrid[row][col] = 0;
      } else {
        playerGrid[row][col] = 1;
      }
      // console.log(playerGrid)
    });
  });

  return maxRowHintLength;
}
