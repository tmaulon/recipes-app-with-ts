export const APP_ID = "";
export const APP_KEY = "";

/**
 * Documentation url : https://developer.edamam.com/edamam-docs-recipe-api
 *
 * Exemple  "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free";
 *
 */
const RecipesSearchURLBase = "https://api.edamam.com/search";

export const getRecipesFromApiWithOnlySearchedText = async (text: string) => {
  const url = `${RecipesSearchURLBase}?q=${text}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.hits;
};

export const getRecipesFromApiWithSearchedTextAndMaximumCalories = async (
  text: string,
  maximumCalories: number
) => {
  const url = `
    ${RecipesSearchURLBase}?q=${text}&app_id=${APP_ID}&app_key=${APP_KEY}&calories=0-${maximumCalories}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.hits);

  return data.hits;
};
