// Placeholder until the local model exists.
// Replace the body with the real model call; keep the same return shape:
// an array of { species, confidence } sorted by confidence, highest first.
export async function identify(imageFile, species) {
  console.info(`Model not loaded yet. ${species.length} species known, photo: ${imageFile.name}`);
  return [];
}
