// Loads the local species list (src/data/species.json).
// Needs the app to be served over http, not opened as a file.
export async function loadSpecies() {
  const response = await fetch(new URL("../data/species.json", import.meta.url));
  if (!response.ok) {
    throw new Error(`Could not load species list (${response.status})`);
  }
  const data = await response.json();
  return data.species;
}
