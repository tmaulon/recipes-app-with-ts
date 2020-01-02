import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export interface IngredientProps {
  text: string;
  weight: number;
}
export interface DigestProps {
  label?: string;
  tag?: string;
  schemaOrgTag?: string;
  total?: number;
  hasRDI?: boolean;
  daily?: number;
  unit?: string;
  sub?: DigestProps[];
}
export interface NutrientProps {
  label: string;
  quantity: number;
  unit: string;
}
export interface TotalNutrientsProps {
  ENERC_KCAL?: NutrientProps;
  FAT?: NutrientProps;
  FASAT?: NutrientProps;
  FATRN?: NutrientProps;
  FAMS?: NutrientProps;
  FAPU?: NutrientProps;
  CHOCDF?: NutrientProps;
  FIBTG?: NutrientProps;
  SUGAR?: NutrientProps;
  PROCNT?: NutrientProps;
  CHOLE?: NutrientProps;
  NA?: NutrientProps;
  CA?: NutrientProps;
  MG?: NutrientProps;
  K?: NutrientProps;
  FE?: NutrientProps;
  ZN?: NutrientProps;
  P?: NutrientProps;
  VITA_RAE?: NutrientProps;
  VITC?: NutrientProps;
  THIA?: NutrientProps;
  RIBF?: NutrientProps;
  NIA?: NutrientProps;
  VITB6A?: NutrientProps;
  FOLDFE?: NutrientProps;
  FOLFD?: NutrientProps;
  VITB12?: NutrientProps;
  VITD?: NutrientProps;
  TOCPHA?: NutrientProps;
  VITK1?: NutrientProps;
  WATER?: NutrientProps;
}
export interface RecipeDataProps {
  uri: string; // Ontology identifier
  label: string; // Recipe title
  image?: string; // Image URL
  source?: string; // Source site identifier
  url?: string; // Original recipe URL
  yield?: number; // Number of servings
  dietLabels?: string[]; // Diet labels: “balanced”, “high-protein”, “high-fiber”, “low-fat”, “low-carb”, “low-sodium” (labels are per serving)
  healthLabels?: string[]; // Health labels: “vegan”, “vegetarian”, “paleo”, “dairy-free”, “gluten-free”, “wheat-free”, “fat-free”, “low-sugar”, “egg-free”, “peanut-free”, “tree-nut-free”, “soy-free”, “fish-free”, “shellfish-free” (labels are per serving)
  cautions?: string[]; // List of Nutrients cautions
  ingredientLines?: string[]; // Ingredients list
  ingredients?: IngredientProps[]; // Ingredients list with weight
  calories?: number; // Total energy, kcal
  totalWeight?: number; // Total weight, g
  totalTime?: number; // Total cooking and prep time for a recipe
  totalNutrients?: TotalNutrientsProps; // Total nutrients for the entire recipe
  totalDaily?: TotalNutrientsProps; // % daily value for the entire recipe
  digest?: DigestProps[]; // Array of nutrients and macronutrients
}
export interface HitProps {
  bookmarked?: boolean;
  bought?: boolean;
  recipe: RecipeDataProps;
}
export interface RecipeSearchDataProps {
  q?: string;
  from?: number;
  to?: number;
  more?: boolean;
  count: number;
  hits: HitProps[];
}

export const RecipeItem: React.FC<HitProps> = ({
  bookmarked,
  bought,
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
        <View>
          <View>
            <Text>Régimes alimentaires : </Text>
            {dietLabels &&
              healthLabels &&
              [...dietLabels, ...healthLabels].map(label => (
                <Text>{label}</Text>
              ))}
          </View>
          <Text>Calorie(s) : {calories}</Text>
          <Text>Poids Total (g) : {totalWeight}g</Text>
        </View>
        <View>
          <Text>Nombre de personne(s) : {otherprops.yield}</Text>
          <Text style={styles.date_text}>Temps : {totalTime}</Text>
        </View>
        <View style={styles.description_container}>
          {ingredientLines &&
            ingredientLines.map(ingredient => {
              <Text style={styles.description_text}>{ingredient}</Text>;
            })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    minHeight: "100%",
    flexDirection: "row"
  },
  image: {
    width: 120,
    height: "100%",
    margin: 5,
    backgroundColor: "gray"
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: "row"
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5
  },
  vote_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666"
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666"
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: "right",
    fontSize: 14
  }
});
