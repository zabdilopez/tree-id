// Walks the dichotomous key one question at a time and shows the species it reaches.
export function startKey(container, key, species) {
  const byId = new Map(species.map((s) => [s.id, s]));
  const history = [];

  function showQuestion(nodeId) {
    const node = key.nodes[nodeId];
    container.replaceChildren();

    const question = document.createElement("h2");
    question.textContent = node.question;
    container.append(question);

    const options = document.createElement("div");
    options.className = "key-options";
    for (const option of node.options) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = option.label;
      button.addEventListener("click", () => {
        if (option.next) {
          history.push(nodeId);
          showQuestion(option.next);
        } else {
          showResult(option.result);
        }
      });
      options.append(button);
    }
    container.append(options);

    if (history.length) {
      container.append(makeButton("Back", "key-back", () => showQuestion(history.pop())));
    }
  }

  function showResult(ids) {
    container.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = ids.length > 1 ? "Possible species" : "Likely species";
    container.append(heading);

    const list = document.createElement("ul");
    list.className = "key-result";
    for (const id of ids) {
      const s = byId.get(id);
      const item = document.createElement("li");
      const name = document.createElement("strong");
      name.textContent = s.commonNameEn;
      const latin = document.createElement("em");
      latin.textContent = ` ${s.genus} ${s.epithet}`;
      const italian = document.createElement("span");
      italian.textContent = ` (${s.commonNameIt})`;
      item.append(name, latin, italian);
      list.append(item);
    }
    container.append(list);

    container.append(makeButton("Start again", "key-back", () => {
      history.length = 0;
      showQuestion(key.start);
    }));
  }

  showQuestion(key.start);
}

function makeButton(label, className, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}
