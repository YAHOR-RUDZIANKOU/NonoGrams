import { createNonogramGrid } from "./createNonogramGrid.js";
import { handleResize } from "./utils.js";

  // let skipNextClick = false;
export function createPictureMenu(obj,level) {
  //   console.log(obj);

  let secColumn = document.querySelector(".choose__wrapper");
  //   console.log(secColumn)
  if (secColumn) {
    secColumn.remove();
  }

  const chooseRow = document.querySelector(".choose__row");

  const choosePictureWrapper = document.createElement("div");
  choosePictureWrapper.classList.add("choose__wrapper");

  const chooseSelected = document.createElement("div");
  chooseSelected.textContent = "Choose picture  ▼";
  chooseSelected.classList.add("choose__selected");

  const chooseItems = document.createElement("ul");
  chooseItems.classList.add("choose__items", "none");

  for (let key in obj) {
    const ItemLi = document.createElement("li");
    ItemLi.classList.add("choose__item");
    ItemLi.textContent = key;
    chooseItems.appendChild(ItemLi);
  }

  choosePictureWrapper.appendChild(chooseSelected);
  choosePictureWrapper.appendChild(chooseItems);

  chooseRow.appendChild(choosePictureWrapper);



  chooseSelected.addEventListener("click", () => {
    chooseItems.classList.toggle("none");
    document.addEventListener("click", changeItemMenu, true);
  });

  let liElements = Array.from(document.querySelectorAll(".choose__item"));
  liElements.forEach((value) => {
    value.addEventListener("click", (event) => {
      chooseItems.classList.toggle("none");
      chooseSelected.innerText = event.target.innerText + "  ▼";

      let currentPicture = event.target.innerText;
      const maxRowHintLength = createNonogramGrid(obj[currentPicture],level,currentPicture);
      window.addEventListener("resize", () => handleResize(maxRowHintLength));
    });
  });
}

export function changeItemMenu(event) {
  const closed=event.target.closest(".choose__selected");
  const chooseItems = document.querySelector(".choose__items");
  const menuItem = event.target.closest(".choose__items");
  if(closed){
    chooseItems.classList.add("none");
    document.removeEventListener("click", changeItemMenu, true);
  }

  if (!menuItem &&  !chooseItems.classList.contains("none")) {
    chooseItems.classList.add("none");
    document.removeEventListener("click", changeItemMenu, true);
  }
}
