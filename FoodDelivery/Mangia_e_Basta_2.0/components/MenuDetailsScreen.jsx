import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import useFetchMenuDetails from "../hooks/useFetchMenuDetails";
import useHandlePurchase from "../hooks/useHandlePurchase";
import { usePositionContext } from "../hooks/usePositionContext";
import { useGetMenuImage } from "../hooks/useGetMenuImage";
import MenuIngredientsScreen from "./MenuIngredientsScreen";
import ReviewScreen from "./ReviewScreen";

const MenuDetailsScreen = ({ mid, closeModal, imageVersion }) => {
  const { lat, lon } = usePositionContext();
  const { image } = useGetMenuImage(mid, imageVersion);
  const { data, isLoading, isError, error } = useFetchMenuDetails(
    mid,
    lat,
    lon
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewsModalVisible, setReviewsModalVisible] = useState(false);
  const { refetch } = useHandlePurchase(mid, lat, lon);

  const handleClick = async () => {
    refetch();
  };

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
        <Text>Errore nel caricamento dei dettagli del menu.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
      {image ? (
        <Image source={{ uri: image }} style={styles.menuImage} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text>Immagine non disponibile</Text>
        </View>
      )}
      <Text style={styles.description}>{data.longDescription}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setReviewsModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Recensioni</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Ingredienti</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Acquista per {data.price}€</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={closeModal}>
          <Text style={styles.buttonText}>Chiudi</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <MenuIngredientsScreen
          mid={mid}
          nomePiatto={data.name}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
      <Modal
        visible={reviewsModalVisible}
        animationType="slide"
        onRequestClose={() => setReviewsModalVisible(false)}
      >
        <ReviewScreen
          piatto={data.name}
          closeModal={() => setReviewsModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

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
  menuImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "left",
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
});

export default MenuDetailsScreen;
