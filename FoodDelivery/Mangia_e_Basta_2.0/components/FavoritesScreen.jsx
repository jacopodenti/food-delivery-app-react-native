import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { getFavorites } from "../lib/storage";
import { useState, useEffect } from "react";

const FavoritesScreen = ({ closeModal }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites();
        setFavorites(favorites);
        setLoading(false);
      } catch (error) {
        console.error("Errore nel recupero dei preferiti", error);
      }
    };
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I tuoi preferiti</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.fav}>{item}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={closeModal}>
        <Text style={styles.buttonText}>Chiudi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FavoritesScreen;

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
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  button: {
    backgroundColor: "black",
    width: "90%",
    padding: 15,
    marginLeft: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  fav: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
