// Loads the local species list (src/data/species.json) and adds the look-for notes
// from src/data/features.json. Needs the app to be served over http, not opened as a file.
export async function loadSpecies() {
  const [speciesResponse, featuresResponse] = await Promise.all([
    fetch(new URL("../data/species.json", import.meta.url)),
    fetch(new URL("../data/features.json", import.meta.url)),
  ]);
  if (!speciesResponse.ok) {
    throw new Error(`Could not load species list (${speciesResponse.status})`);
  }
  if (!featuresResponse.ok) {
    throw new Error(`Could not load features (${featuresResponse.status})`);
  }
  const data = await speciesResponse.json();
  const { features } = await featuresResponse.json();
  return data.species.map((s) => ({ ...s, lookFor: features[s.id] ?? [] }));
}
