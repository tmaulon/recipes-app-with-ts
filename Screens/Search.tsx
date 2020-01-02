import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Slider,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import { HitProps } from "../Components/RecipeItem";
import {
  getRecipesFromApiWithSearchedTextOnly,
  getRecipesCountFromApiWithSearchedTextOnly,
  getMoreRecipesFromApiWithSearchedTextOnly
} from "../Services/API/RecipeSearch";
import { RecipeCardItem } from "../Components/RecipeCardItem";

export const Search = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const minimumCalories = useRef<number>(0);
  const maximumCalories = useRef<number>(5000);

  // recipes search API call
  const [recipes, setRecipes] = useState<HitProps[]>([]);
  const [searchedText, setSearchedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [minPageNumber, setMinPageNumber] = useState<number>(0);
  const [lastPageNumber, setLastPageNumber] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  // const [endReached, setEndReached] = useState<boolean>(false);

  // const getMoreRecipesFromApiWithSearchedTextOnly = async (
  //   query: string,
  //   fromPageNumber: number,
  //   toPageNumber: number
  // ) => {
  //   const url = `${RecipesSearchURLBase}?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${fromPageNumber}&to=${toPageNumber}`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   if (!recipes) {
  //     console.log("not recipes !");
  //     return;
  //   }
  //   return [...recipes, ...data.hits];
  // };

  // const loadRecipes = async () => {
  //   setIsLoading(true);
  //   const url = `${RecipesSearchURLBase}?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${minPageNumber}&to=${lastPageNumber}`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   if (data.hits) {
  //     setRecipes([...recipes, ...data.hits]);
  //   }
  //   setIsLoading(false);
  // };

  const loadMore = async () => {
    // TODO FIX load more
    console.log("end reached");
    setIsLoading(true);
    setMinPageNumber(lastPageNumber);
    setLastPageNumber(lastPageNumber + 10);
    console.log("minpage, lastpage :", minPageNumber, lastPageNumber);
    console.log("recipes :", recipes);
    const nextRecipes = await getMoreRecipesFromApiWithSearchedTextOnly(
      query,
      minPageNumber,
      lastPageNumber
    );
    setRecipes([...recipes, ...nextRecipes]);
    setIsLoading(false);
  };

  useEffect(() => {
    setMinPageNumber(0);
    setLastPageNumber(10);
    setTotalPages(100);
    setRecipes([]);
    const fetchData = async () => {
      setIsLoading(true);

      setRecipes(await getRecipesFromApiWithSearchedTextOnly(query));
      setTotalPages(await getRecipesCountFromApiWithSearchedTextOnly(query));

      setIsLoading(false);
    };
    fetchData();
  }, [query]);

  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          alignItems: "center"
        }}
      >
        <Text>Rechercher une recette avec un ingrédient</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nom d'ingrédient"
          onChangeText={text => setSearchedText(text)}
          onSubmitEditing={() => setQuery(searchedText)}
        />
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
      <Button title="Rechercher" onPress={() => setQuery(searchedText)} />

      {isLoading ? (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        recipes && (
          <FlatList
            horizontal
            data={recipes}
            keyExtractor={(item, index) => `${item.recipe.uri}-${index}`}
            renderItem={({ item }) => <RecipeCardItem recipe={item.recipe} />}
            onEndReachedThreshold={0.5}
            onEndReached={loadMore}
            initialNumToRender={10}
          />
        )
      )}
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
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Search;
