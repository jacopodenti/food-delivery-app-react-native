import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import reviews from "../utils/reviews";

const ReviewItem = ({ user, rating, comment }) => (
  <View style={styles.reviewContainer}>
    <Text style={styles.user}>{user}</Text>
    <Text style={styles.rating}>★ {rating}/5</Text>
    <Text style={styles.comment}>{comment}</Text>
  </View>
);

const ReviewScreen = ({ piatto, closeModal }) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recensioni degli utenti per {piatto}</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewItem {...item} />}
      />
      <TouchableOpacity style={styles.button} onPress={closeModal}>
        <Text style={styles.buttonText}>Chiudi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  user: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 14,
    color: "#FFD700",
  },
  comment: {
    fontSize: 14,
    marginTop: 5,
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
});

export default ReviewScreen;
