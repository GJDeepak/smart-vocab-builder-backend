export const fetchWordDetails = async (
  word
) => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  if (!response.ok) {
    throw new Error(
      "Word not found in dictionary"
    );
  }

  const data =
    await response.json();

  const entry = data?.[0];

  const definition =
    entry?.meanings?.[0]
      ?.definitions?.[0]
      ?.definition ||
    "No definition available";

  const example =
    entry?.meanings?.[0]
      ?.definitions?.[0]
      ?.example ||
    "No example available";

  return {
    definition,
    example,
  };
};