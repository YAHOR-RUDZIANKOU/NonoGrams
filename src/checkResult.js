import { createRepeatPopUp, createWinnerPopUp, formatTime } from "./utils.js";
import {createTableResult} from "./createTableResult.js";

export let winMusic = new Audio("./music/winMus.mp3");
export let endTime;

export function checkResult(question, answer) {
  //   console.log(question);
  //   console.log(answer);

  let isCorrect = true;

  // console.log(question);
  for (let row = 0; row < answer.length; row++) {
    for (let col = 0; col < answer.length; col++) {
      if (question[row][col] !== answer[row][col]) {
        isCorrect = false;
        //   console.log("ты проиграл");
        createRepeatPopUp();
        break;
      }
    }
    if (!isCorrect) break;
  }

  if (isCorrect) {
    // localStorage.removeItem("savedGame");
    const selectedValue = document.querySelector("#level").value;
    let picture = document.querySelector(".choose__selected").innerHTML;
    picture = picture.slice(0, -2);

    winMusic.play();
    endTime = Date.now();
    let result = createWinnerPopUp();

    const saved = JSON.parse(localStorage.getItem("nonogram:records")) || [];

    const player = {
      level: selectedValue,
      picture: picture,
      time: result,
    };

    saved.push(player);
    saved.sort((a, b) => a.time - b.time);
    
    let newArr=saved.slice(0,5)
    localStorage.setItem("nonogram:records", JSON.stringify(newArr));

    createTableResult(newArr);

    // очистить таблицу рекордов
    // localStorage.removeItem("nonogram:records");
  }
}
