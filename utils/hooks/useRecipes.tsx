import React, { useEffect, useState } from "react";
import {
  RecipesSearchURLBase,
  APP_ID,
  APP_KEY
} from "../../Services/API/RecipeSearch";
import { HitProps } from "../../Components/RecipeItem";

export const getRecipes: (query: string) => Promise<HitProps[]> = async (
  query: string
) => {
  const url = `${RecipesSearchURLBase}?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.hits;
};

export const useRecipes = (query: string) => {
  const [recipes, setRecipes] = useState<HitProps[]>([]);

  useEffect(() => {
    getRecipes(query).then(recipes => setRecipes(recipes));
  }, []);

  return recipes;
};
