import React, { Component, useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  Slider,
  Button,
  StyleSheet,
  FlatList
} from "react-native";
import { RecipeItem, HitProps } from "../Components/RecipeItem";
import { getRecipesFromApiWithOnlySearchedText } from "../Services/API/RecipeSearch";
import { RecipeCardItem } from "../Components/RecipeCardItem";

export const Search = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const minimumCalories = useRef<number>(0);
  const maximumCalories = useRef<number>(5000);
  const [recipes, setRecipes] = useState<HitProps[]>([]);

  const handleResearch = async () => {
    setRecipes(await getRecipesFromApiWithOnlySearchedText("chicken"));
    recipes.map(item => console.log("total time : ", item.recipe.totalTime));
  };
  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          alignItems: "center"
        }}
      >
        <Text> Rechercher une recette avec un ingrédient </Text>
        <TextInput style={styles.textInput} placeholder="Nom d'ingrédient" />
      </View>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 30
        }}
      >
        <Text style={styles.sliderInputText}>
          Filtrer avec un nombre de calories maximum
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.sliderLabels, styles.leftSliderLabel]}>
            {minimumCalories.current}
          </Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={minimumCalories.current}
            maximumValue={maximumCalories.current}
            step={1}
            value={sliderValue}
            onValueChange={val => setSliderValue(val)}
            thumbTintColor="rgb(252, 228, 149)"
            maximumTrackTintColor="#d3d3d3"
            minimumTrackTintColor="rgb(252, 228, 149)"
          />
          <Text style={[styles.sliderLabels, styles.rightSliderLabel]}>
            {maximumCalories.current}
          </Text>
        </View>
        <Text style={styles.sliderValue}>{sliderValue}</Text>
      </View>
      <Button title="Rechercher" onPress={handleResearch} />

      <FlatList
        horizontal
        data={recipes}
        keyExtractor={(item, index) => `${item.recipe.uri}-${index}`}
        // renderItem={({ item }) => <RecipeItem recipe={item.recipe} />}
        renderItem={({ item }) => <RecipeCardItem recipe={item.recipe} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "80%",
    height: 50,
    borderBottomColor: "rgb(252, 228, 149)",
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingLeft: 5
  },
  sliderInputText: {
    marginBottom: 15
  },
  sliderInput: {
    width: "80%",
    height: 50,
    borderBottomColor: "rgb(252, 228, 149)",
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingLeft: 5
  },
  sliderLabels: {
    color: "#d3d3d3"
  },
  leftSliderLabel: {
    marginRight: 15
  },
  rightSliderLabel: {
    marginRight: 15
  },
  sliderValue: {
    color: "rgb(252, 228, 149)",
    fontWeight: "bold",
    marginTop: 15
  }
});

export default Search;
