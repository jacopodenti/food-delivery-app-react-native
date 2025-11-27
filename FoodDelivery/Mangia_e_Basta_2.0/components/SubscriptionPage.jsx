import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import useGetSub from "../hooks/useGetSub";

const SubscriptionPage = ({ closeModal, uid }) => {
  const { refetch } = useGetSub(uid);

  const handleClick = async () => {
    refetch();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abbonamento mangione</Text>
      <Text style={styles.text}>
        "Vuoi acquistare l'abbonamento mangione a 10€? La durata
        dell'abbonamento è di 30 giorni e ti darà accesso a fantastici sconti su
        moltissimi menù."
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Acquista per 10€</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={closeModal}>
          <Text style={styles.buttonText}>Chiudi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubscriptionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: "center",
  },
});
