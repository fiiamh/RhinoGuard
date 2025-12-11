/// <reference types="expo-router" />
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ObservationScreen() {
  const router = useRouter();

  const animals = [
    { name: "Rhino", image: require("../assets/images/sarvikuono.png"), href: "/observation/rhino" },
    { name: "Lion", image: require("../assets/images/leijona.png"), href: "/observation/lion" },
    { name: "Leopard", image: require("../assets/images/leopardi.png"), href: "/observation/leopard" },
    { name: "Elephant", image: require("../assets/images/norsu.png"), href: "/observation/elephant" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.header} onPress={() => router.back()}>
        <Text style={styles.backText}>⟵ Back</Text>
      </Pressable>

      {/* Title */}
      <Text style={styles.title}>What animal did you see?{"\n"}Press the picture.</Text>

      {/* Grid */}
      <View style={styles.grid}>
  {animals.map((animal, index) => (
    <Pressable
      key={index}
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/observation",
          params: { animal: animal.name }
        })
      }
    >
      <Image source={animal.image} style={styles.image} />
      <Text style={styles.cardText}>{animal.name}</Text>
    </Pressable>
  ))}
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#75a769ff", 
  },

  header: {
    position: "absolute",
    top: 40,
    left: 15,
  },

  backText: {
    color: "black",
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "Georgia",
  },

  title: {
    textAlign: "center",
    color: "black",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 35,
    fontFamily: "Georgia",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "rgba(0,125,90,0.85)", // sama vihreä kuin kotivalikossa
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
  },

  image: {
    width: 250,   // 🔥 SUUREMMAT KUVAT
    height: 200,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 10,
  },

  cardText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Georgia",
  },
});

