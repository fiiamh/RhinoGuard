/// <reference types="expo-router" />
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ObservationScreen() {
  const router = useRouter();

  const animals = [
    { name: "Rhino", image: require("../assets/images/sarvikuono.png") },
    { name: "Lion", image: require("../assets/images/leijona.png") },
    { name: "Leopard", image: require("../assets/images/leopardi.png") },
    { name: "Elephant", image: require("../assets/images/norsu.png") },
  ];

  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "confirm" | "thankyes" | "thankno">("select");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.header} onPress={() => router.back()}>
        <Text style={styles.backText}>⟵ Back</Text>
      </Pressable>

      {/* 1️⃣ VALINTA: NÄYTÄ ELÄIMET */}
      {step === "select" && (
        <>
          <Text style={styles.title}>What animal did you see?{"\n"}Press the picture.</Text>

          <View style={styles.grid}>
            {animals.map((animal, index) => (
              <Pressable
                key={index}
                style={styles.card}
                onPress={() => {
                  setSelectedAnimal(animal.name);
                  setStep("confirm");
                }}
              >
                <Image source={animal.image} style={styles.image} />
                <Text style={styles.cardText}>{animal.name}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}

      {/* 2️⃣ KYSYMYS: HALUATKO RAPORTOIDA TÄSTÄ? */}
      {step === "confirm" && selectedAnimal && (
        <View style={{ marginTop: 40 }}>
          <Text style={styles.title}>
            Do you want to report this observation of a {selectedAnimal}?
          </Text>

          <Pressable
            style={styles.yesButton}
            onPress={() => setStep("thankyes")}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </Pressable>

          <Pressable
            style={styles.noButton}
            onPress={() => setStep("thankno")}
          >
            <Text style={styles.buttonText}>No</Text>
          </Pressable>
        </View>
      )}

      {/* 3️⃣ KIITOS – YES */}
      {step === "thankyes" && (
        <View style={styles.messageBox}>
          <Text style={styles.bigIcon}>✔</Text>
          <Text style={styles.messageTitle}>Thank you!</Text>
          <Text style={styles.messageText}>
            Your observation of a {selectedAnimal} has been recorded.
          </Text>

          <Pressable
            style={styles.homeButton}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </Pressable>
        </View>
      )}

      {/* 3️⃣ KIITOS – NO */}
      {step === "thankno" && (
        <View style={styles.messageBox}>
          <Text style={styles.bigIcon}>✔</Text>
          <Text style={styles.messageTitle}>Observation dismissed</Text>
          <Text style={styles.messageText}>
            Thank you for your response.
          </Text>

          <Pressable
            style={styles.homeButton}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </Pressable>
        </View>
      )}
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
    backgroundColor: "rgba(0,125,90,0.85)",
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
  width: 150,
  height: 150,
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

  yesButton: {
    backgroundColor: "rgba(0,125,90,0.85)",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },

  noButton: {
    backgroundColor: "#888",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Georgia",
  },

  messageBox: {
    marginTop: 60,
    padding: 30,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
  },

  bigIcon: {
    fontSize: 50,
    color: "green",
    marginBottom: 10,
  },

  messageTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    fontFamily: "Georgia",
  },

  messageText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 25,
    fontFamily: "Georgia",
  },

  homeButton: {
    backgroundColor: "rgba(0,125,90,0.85)",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  homeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Georgia",
  },
});
