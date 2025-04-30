import { formatTime } from "./utils.js";

export function createTableResult(records) {
    let wrapper=document.querySelector('.wrapper');
  // Создаём таблицу
  const table = document.createElement("table");
  table.classList.add("highscore-table");

  // Создаём заголовки
  const thead = document.createElement("thead");
  thead.classList.add("highscore-header");

  const headerRow = document.createElement("tr");
  headerRow.classList.add("highscore-row");
  ["Level", "Picture", "Time"].forEach((text) => {
    const th = document.createElement("th");
    th.classList.add("highscore-cell");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Создаём тело таблицы
  const tbody = document.createElement("tbody");
  records.forEach((record) => {
    const row = document.createElement("tr");

    const levelCell = document.createElement("td");
    levelCell.classList.add("highscore-cell");
    levelCell.textContent = record.level;
    row.appendChild(levelCell);

    const pictureCell = document.createElement("td");
    pictureCell.classList.add("highscore-cell");
    pictureCell.textContent = record.picture;
    row.appendChild(pictureCell);

    const timeCell = document.createElement("td");
    timeCell.classList.add("highscore-cell");
    timeCell.textContent = formatTime(record.time);
    row.appendChild(timeCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  wrapper.appendChild(table)
}
