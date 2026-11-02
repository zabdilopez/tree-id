import { loadSpecies } from "./services/species.js";
import { identify } from "./services/classifier.js";
import { renderResults } from "./components/ResultsList.js";
import { startKey } from "./components/KeyWizard.js";
import { loadKey } from "./services/key.js";

const input = document.querySelector("#photo");
const preview = document.querySelector("#preview");
const status = document.querySelector("#status");
const results = document.querySelector("#results");

const speciesPromise = loadSpecies();

Promise.all([speciesPromise, loadKey()])
  .then(([species, key]) => startKey(document.querySelector("#key"), key, species))
  .catch((error) => {
    document.querySelector("#key").textContent = `Key unavailable: ${error.message}`;
  });

input.addEventListener("change", async () => {
  const file = input.files[0];
  if (!file) return;

  preview.src = URL.createObjectURL(file);
  preview.hidden = false;
  status.textContent = "Identifying...";
  results.replaceChildren();

  try {
    const species = await speciesPromise;
    const matches = await identify(file, species);
    renderResults(results, matches);
    status.textContent = matches.length ? "" : "No match found.";
  } catch (error) {
    status.textContent = `Something went wrong: ${error.message}`;
  }
});
