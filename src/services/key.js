// Loads the identification key (src/data/key.json).
export async function loadKey() {
  const response = await fetch(new URL("../data/key.json", import.meta.url));
  if (!response.ok) {
    throw new Error(`Could not load identification key (${response.status})`);
  }
  return response.json();
}
