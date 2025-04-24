import { createRepeatPopUp, createWinnerPopUp } from "./utils.js";

export let endTime;
export function checkResult(question, answer) {
  console.log(question);
  console.log(answer);

  let isCorrect = true;

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
    // console.log("ты победил");
    endTime = Date.now();
    createWinnerPopUp();
  }
}
