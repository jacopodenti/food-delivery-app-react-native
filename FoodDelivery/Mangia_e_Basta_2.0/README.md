**Recensioni (da mostrare) con hook**

- hook copiato dagli altri
  -import React from "react";
  import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  } from "react-native";
  import { useFetchReviews } from "../hooks/useFetchReviews";

const ReviewItem = ({ user, rating, comment }) => (
<View style={styles.reviewContainer}>
<Text style={styles.user}>{user}</Text>
<Text style={styles.rating}>★ {rating}/5</Text>
<Text style={styles.comment}>{comment}</Text>
</View>
);

const ReviewScreen = ({ piatto, closeModal }) => {
const { data: reviews, isLoading, isError } = useFetchReviews(piatto);

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
<Text style={styles.errorText}>
Errore nel caricamento delle recensioni
</Text>
<TouchableOpacity style={styles.button} onPress={closeModal}>
<Text style={styles.buttonText}>Chiudi</Text>
</TouchableOpacity>
</View>
);
}

return (
<View style={styles.container}>
<Text style={styles.title}>Recensioni degli utenti per {piatto}</Text>
{reviews.length === 0 ? (
<Text style={styles.noReviewsText}>Nessuna recensione disponibile.</Text>
) : (
<FlatList
data={reviews}
keyExtractor={(item) => item.id.toString()}
renderItem={({ item }) => <ReviewItem {...item} />}
/>
)}
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
errorText: {
fontSize: 16,
color: "red",
textAlign: "center",
marginBottom: 20,
},
noReviewsText: {
fontSize: 16,
textAlign: "center",
marginVertical: 20,
color: "#555",
},
});

export default ReviewScreen;

**Recensioni con bottone dopo consegna ordine**
1 Imposta uno stato per gestire la visibilità della modal della recensione:
const [reviewModalVisible, setReviewModalVisible] = useState(false);
2 Nella parte del render, dopo i dettagli dell'ordine, aggiungi un blocco condizionale:
{order.status === "COMPLETED" && (
<TouchableOpacity
style={styles.reviewButton}
onPress={() => setReviewModalVisible(true)}

>

    <Text style={styles.reviewButtonText}>Lascia una recensione</Text>

  </TouchableOpacity>
)}
3 Aggiungi la Modal per il form della recensione (oppure naviga verso un'altra schermata):
<Modal
  visible={reviewModalVisible}
  animationType="slide"
  onRequestClose={() => setReviewModalVisible(false)}
>
  <ReviewScreen 
    orderId={order.oid}  // o eventualmente altri parametri utili
    closeModal={() => setReviewModalVisible(false)}
  />
</Modal>
4 Crea o modifica il componente ReviewScreen in modo da gestire il form per la recensione.
5 Aggiorna gli stili

**pagina per inserire recensioni**
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSubmitReview } from "../hooks/useSubmitReview"; // Assicurati di implementare questo hook

const ReviewPage = ({ menuId, navigation }) => {
const [name, setName] = useState("");
const [rating, setRating] = useState("");
const [comment, setComment] = useState("");
const [loading, setLoading] = useState(false);

const { submitReview } = useSubmitReview(); // Hook che gestisce l'invio della recensione

const handleSubmit = async () => {
if (!name || !rating || !comment) {
Alert.alert("Errore", "Compila tutti i campi.");
return;
}
setLoading(true);
try {
await submitReview({
menuId,
name,
rating: Number(rating),
comment,
});
Alert.alert("Successo", "Recensione inviata correttamente!");
navigation.goBack();
} catch (error) {
console.error(error);
Alert.alert("Errore", "Impossibile inviare la recensione.");
} finally {
setLoading(false);
}
};

return (
<View style={styles.container}>
<Text style={styles.title}>Lascia la tua Recensione</Text>
<TextInput
        style={styles.input}
        placeholder="Il tuo nome"
        value={name}
        onChangeText={setName}
      />
<TextInput
        style={styles.input}
        placeholder="Valutazione (da 1 a 5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="number-pad"
      />
<TextInput
style={[styles.input, styles.textArea]}
placeholder="Il tuo commento"
value={comment}
onChangeText={setComment}
multiline
numberOfLines={4}
/>
<TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
<Text style={styles.buttonText}>
{loading ? "Invio..." : "Invia Recensione"}
</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
<Text style={styles.buttonText}>Annulla</Text>
</TouchableOpacity>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
backgroundColor: "#fff",
justifyContent: "center",
},
title: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 20,
textAlign: "center",
},
input: {
borderWidth: 1,
borderColor: "#ccc",
borderRadius: 8,
padding: 10,
marginBottom: 15,
},
textArea: {
height: 100,
},
button: {
backgroundColor: "black",
padding: 15,
borderRadius: 8,
alignItems: "center",
marginBottom: 10,
},
buttonText: {
color: "white",
fontSize: 16,
fontWeight: "bold",
},
cancelButton: {
backgroundColor: "#888",
},
});

export default ReviewPage;

**finestra di dialogo per ingrediente (punto 4)**

{/_ Modal per la descrizione dell'ingrediente _/}
<Modal
animationType="slide"
transparent={true}
visible={modalVisible}
onRequestClose={() => {
setModalVisible(false);
setSelectedIngredient(null);
}} >
<View style={styles.modalOverlay}>
<View style={styles.modalContent}>
{selectedIngredient && (
<>
<Text style={styles.modalTitle}>{selectedIngredient.name}</Text>
<Text style={styles.modalDescription}>
{selectedIngredient.description}
</Text>
<Button
title="Chiudi"
onPress={() => {
setModalVisible(false);
setSelectedIngredient(null);
}}
/>
</>
)}
</View>
</View>
</Modal>
</View>
);
};

**Valori nutrizionali stampati in MenuDetails**

const { nutritionalValues, isLoading: nutLoading } = useFetchNutritionalValues(mid);

{data.nutritionalValues && (
<View style={{ marginTop: 10 }}>
<Text style={styles.nutritionalTitle}>Valori nutrizionali:</Text>
{Object.entries(data.nutritionalValues).map(([key, value]) => (
<Text key={key} style={styles.nutritionalText}>
{key}: {value}
</Text>
))}
</View>
)}

**Totale calorie per ogni ingrediente**
import useFetchIngredients from "../hooks/useFetchIngredients";

const MenuDetailsScreen = ({ mid, ...props }) => {
const ingredients = useFetchIngredients(mid);
const totalCalories = ingredients.reduce((acc, i) => acc + (i.calories || 0), 0);

return (
// ...existing code...
<Text>Totale calorie: {totalCalories}</Text>
// ...existing code...
);
};
// ...existing code...
