/// <reference types="expo-router" />


import { Link, useRouter } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/rhino.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Header with Back */}
      <Pressable style={styles.header} onPress={() => router.back()}>
        <Text style={styles.backText}>⟵ Back</Text>
      </Pressable>

      {/* Content */}
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Ranger</Text>

        {/* BUTTONS */}
        <Link href="/report-poaching" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Report Rhino Poaching</Text>
          </Pressable>
        </Link>

        <Link href="/report-injury" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Report Injured Animal</Text>
          </Pressable>
        </Link>

        <Link href="/check-status" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Check Status of Reports</Text>
          </Pressable>
        </Link>

        <Link href="/observation" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Animal Observation</Text>
          </Pressable>
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  header: {
    position: "absolute",
    top: 45,
    left: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  backText: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "Georgia",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },

  container: {
    marginTop: 120,
    paddingHorizontal: 30,
  },

  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 40,
    fontFamily: "Georgia",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },

  button: {
    backgroundColor: "rgba(0,125,90,0.85)",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Georgia",
  },
});
