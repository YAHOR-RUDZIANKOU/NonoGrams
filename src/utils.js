import { startTime, saveTime } from "./createNonogramGrid.js";
import { endTime, winMusic } from "./checkResult.js";
import { createMenu } from "./createMenu.js";
import { changeItemMenu } from "./createPictureMenu.js";

export function getRowHints(arr) {
  let result = [];
  // console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    let hintsArr = [];
    let count = 0; // Счётчик для блоков единиц

    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 1) {
        count++;
      } else if (count > 0) {
        hintsArr.push(count);
        count = 0;
      }
    }

    if (count > 0) {
      hintsArr.push(count);
    }

    result.push(hintsArr);
  }

  return result;
}

export function getColumnHints(arr) {
  let result = [];
  // console.log(arr);
  for (let j = 0; j < arr[0].length; j++) {
    let hintsArr = [];
    let count = 0; // Счётчик для блоков единиц

    for (let i = 0; i < arr.length; i++) {
      if (arr[i][j] === 1) {
        count++;
      } else if (count > 0) {
        hintsArr.push(count);
        count = 0;
      }
    }

    if (count > 0) {
      hintsArr.push(count);
    }

    result.push(hintsArr);
  }

  return result;
}

export function removeElement(element) {
  element.remove();
}

export function handleResize(maxRowHintLength) {
  const width = window.innerWidth;

  const wrapper = document.querySelector(".wrapper");
  if (wrapper) {
    let columnHintsWrapper = document.querySelector(".hint__column-wrapper");
    if (width > 800) {
      columnHintsWrapper.style.paddingLeft = `${maxRowHintLength * 35}px`;
    } else if (width > 650 && width <= 800) {
      columnHintsWrapper.style.paddingLeft = `${maxRowHintLength * 25}px`;
    } else if (width < 651) {
      columnHintsWrapper.style.paddingLeft = `${maxRowHintLength * 22}px`;
    }
  }
}

export function createRepeatPopUp() {
  document.documentElement.classList.add("no__flip");

  const backdrop = document.createElement("div");
  backdrop.classList.add("modal-backdrop");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const wrapper = document.createElement("div");
  wrapper.classList.add("modal__wrapper");

  const title = document.createElement("p");
  title.classList.add("title__error");
  title.textContent = "The picture is wrong ";

  const button = document.createElement("button");
  button.classList.add("subtitle__error-btn");
  button.textContent = "Continue playing ";

  wrapper.appendChild(title);
  wrapper.appendChild(button);

  modal.appendChild(wrapper);
  backdrop.appendChild(modal);

  document.body.appendChild(backdrop);

  setTimeout(() => {
    modal.classList.add("change__top");
  }, 0);

  button.addEventListener("click", () => {
    document.documentElement.classList.remove("no__flip");
    backdrop.remove();
  });
}

export function createWinnerPopUp() {
  let result;
  if (localStorage.getItem("savedGame") === null) {
    let distanse = endTime - startTime;
    result = formatTime(distanse);
  } else {
    let distanse = endTime - startTime + saveTime;
    result = formatTime(distanse);
    localStorage.removeItem("savedGame");
  }

  document.documentElement.classList.add("no__flip");

  const backdrop = document.createElement("div");
  backdrop.classList.add("modal-backdrop");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const wrapper = document.createElement("div");
  wrapper.classList.add("modal__wrapper");

  const title = document.createElement("p");
  title.classList.add("title__error");
  title.textContent = "Victory ";

  const button = document.createElement("button");
  button.classList.add("subtitle__win");
  button.textContent = `Result time: ${result}`;

  const img = document.createElement("img");
  img.src = "./images/close.png";
  img.classList.add("img__close");

  wrapper.appendChild(img);
  wrapper.appendChild(title);
  wrapper.appendChild(button);

  modal.appendChild(wrapper);
  backdrop.appendChild(modal);

  document.body.appendChild(backdrop);

  img.addEventListener("click", () => {
    document.documentElement.classList.remove("no__flip");
    let newElementMain = document.querySelector(".container");
    winMusic.pause();
    winMusic.currentTime = 0;
    if (newElementMain) {
      removeElement(newElementMain);
    }
    document.removeEventListener("click", changeItemMenu, true);
    backdrop.remove();
    createMenu();
  });

  setTimeout(() => {
    modal.classList.add("change__top");
  }, 0);
}

export function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedMinutes}:${paddedSeconds}`;
}

export function musicSetting(music) {
  music.play();
  setTimeout(() => {
    music.pause();
    music.currentTime = 0;
  }, 300);
}
