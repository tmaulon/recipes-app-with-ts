import React, { Component, useState, useRef } from "react";
import { Text, View, TextInput, Slider, Button } from "react-native";

export const Search = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const minimumCalories = useRef<number>(0);
  const maximumCalories = useRef<number>(5000);
  const handleResearch = () => {
    console.log("research lauched");
  };
  return (
    <View>
      <Text> Search </Text>
      <TextInput placeholder="Nom d'ingrédient(s)" />
      <View style={{ alignItems: "center", paddingVertical: 30 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#d3d3d3", marginRight: 15 }}>
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
          <Text style={{ color: "#d3d3d3", marginLeft: 15 }}>
            {maximumCalories.current}
          </Text>
        </View>
        <Text
          style={{
            color: "rgb(252, 228, 149)",
            fontWeight: "bold",
            marginTop: 15
          }}
        >
          {sliderValue}
        </Text>
      </View>
      <Button title="Rechercher" onPress={handleResearch} />
    </View>
  );
};

export default Search;
