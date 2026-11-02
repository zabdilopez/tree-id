// Shows the identification matches as a ranked list.
export function renderResults(container, matches) {
  for (const { species, confidence } of matches) {
    const item = document.createElement("li");

    const name = document.createElement("strong");
    name.textContent = species.commonNameEn;

    const latin = document.createElement("em");
    latin.textContent = ` ${species.genus} ${species.epithet}`;

    const score = document.createElement("span");
    score.textContent = ` ${Math.round(confidence * 100)}%`;

    item.append(name, latin, score);
    container.append(item);
  }
}
