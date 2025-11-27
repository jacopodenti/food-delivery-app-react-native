import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useGetMenuImage } from "../hooks/useGetMenuImage";
import { saveFavorite } from "../lib/storage";

const MenuItem = ({ item, sid, imageVersion, onPress }) => {
  const { image, loading, error } = useGetMenuImage(
    item.mid,
    sid,
    imageVersion
  );

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        {loading ? (
          <ActivityIndicator size={"small"} color={"black"} />
        ) : image ? (
          <Image
            source={{ uri: image }}
            style={styles.menuImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text>Immagine non disponibile</Text>
          </View>
        )}
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuDescription}>{item.shortDescription}</Text>
        {item.discount ? (
          <View style={styles.discount}>
            <Text style={styles.menuCost}>
              Prezzo scontato del: {item.discount}% ✅
            </Text>
            <Text style={styles.menuCost}>{item.price}€</Text>
          </View>
        ) : (
          <Text style={styles.menuCost}>{item.price}€</Text>
        )}
        <Text style={styles.menuDeliveryTime}>
          Consegna fra {item.deliveryTime} min
        </Text>
        <Text style={styles.reviews}>★ 4.3 Molto buono (5+)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => saveFavorite(item.name)}
      >
        <Text style={styles.likeButtonText}>❤️</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MenuItem;

const styles = StyleSheet.create({
  menuItem: {
    width: 300,
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    margin: 5,
    backgroundColor: "#f9f9f9",
  },
  menuName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  menuImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  menuDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  menuCost: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginTop: 5,
  },
  menuDeliveryTime: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    marginTop: 5,
  },
  placeholderImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  reviews: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  likeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 8,
    borderRadius: 4,
  },
  likeButtonText: {
    fontSize: 16,
  },
  discount: {
    alignItems: "center",
  },
});
