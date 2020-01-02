import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Search from "./Screens/Search";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Search />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
