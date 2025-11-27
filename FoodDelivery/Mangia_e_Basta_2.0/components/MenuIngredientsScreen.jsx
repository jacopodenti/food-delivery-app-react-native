import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useFetchMenuIngredients } from "../hooks/useFetchMenuIngredients";

const MenuIngredientsScreen = ({ mid, closeModal, nomePiatto }) => {
  const { data, isLoading, isError, error } = useFetchMenuIngredients(mid);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Errore nel recupero degli ingredienti del menù</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  console.log(
    "Esame gennaio: menù",
    mid,
    ", numero di ingredienti: ",
    data.length
  );

  return (
    <View>
      <Text style={styles.title}>Ingredienti di: {nomePiatto} </Text>
      <View style={styles.ingredientContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.ingredientItem}>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.ingredientDescription}>
                {item.description}
              </Text>
              <Text style={styles.ingredientOrigin}>
                Origine: {item.origin}
              </Text>
              <Text>Bio: {item.bio ? "Si" : "No"}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={closeModal}>
        <Text style={styles.buttonText}>Chiudi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  ingredientsContainer: {
    marginBottom: 16,
  },
  ingredientItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ingredientDescription: {
    fontSize: 14,
    color: "#555",
  },
  ingredientOrigin: {
    fontSize: 12,
    color: "#777",
  },
  button: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MenuIngredientsScreen;
