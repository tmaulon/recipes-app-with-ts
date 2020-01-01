import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { HitProps } from "./RecipeItem";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export const RecipeCardItem: React.FC<HitProps> = ({
  recipe: {
    uri,
    label,
    image,
    source,
    url,
    dietLabels,
    healthLabels,
    cautions,
    ingredientLines,
    ingredients,
    calories,
    totalWeight,
    totalTime,
    totalNutrients,
    totalDaily,
    digest,
    ...otherprops
  }
}) => {
  return (
    <View style={styles.main_container}>
      <Image style={styles.image} source={{ uri: image }} />

      <View style={styles.content_container}>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>{label}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    position: "relative",
    flex: 1,
    minHeight: "60%",
    flexDirection: "row",
    marginHorizontal: 15,
    elevation: 1, // only for android
    shadowOffset: { width: 1, height: 1 }, //only for ios
    shadowColor: "#000", //only for ios
    width: wp("90%"),
    shadowOpacity: 0.7,
    backgroundColor: "#fff",
    borderRadius: 50,
    overflow: "hidden"
  },
  image_container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  content_container: {
    flex: 1,
    margin: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 50,
    width: "100%"
  },
  header_container: {
    flex: 1
  },
  title_text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 50
  }
});
