/// <reference types="expo-router" />

export const unstable_settings = {
  headerShown: false,
};

import { Link } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/rhino.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Tumma pehmeä overlay jotta tekstit näkyvät */}
      <View style={styles.overlay} />

      {/* Yläosan kielivalikko + yhteistyöteksti */}
      <View style={styles.topBar}>
        <Pressable style={styles.languageButton}>
          <Text style={styles.languageText}>EN</Text> 
        </Pressable>
        <Pressable style={styles.languageButton}>
          <Text style={styles.languageText}>DEU</Text>
        </Pressable>
        <Pressable style={styles.languageButton}>
          <Text style={styles.languageText}>AFRIKAANS</Text>
        </Pressable>

        <Text style={styles.partners}>
          In collaboration with Namibian Nature Conservancy and National Parks.
        </Text>
      </View>

      {/* Logo + slogan vasemmalla ylhäällä */}
      <View style={styles.centerContent}>
        <Text style={styles.title}>RhinoGuard</Text>
        <Text style={styles.slogan}>Your Eyes In The Wild.</Text>
      </View>

      {/* Continue / Login nappi alhaalla keskellä */}
      <View style={styles.bottomButtonContainer}>
        <Link href="/login" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-between",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  /* =====================
        YLÄOSAN KIELIVALIKKO
     ===================== */
  topBar: {
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  languageButton: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  languageText: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
    fontFamily: "Georgia",
  },

  partners: {
    color: "white",
    fontSize: 13,
    opacity: 0.95,
    textAlign: "right",
    fontWeight: "700",     // BOLD
    fontFamily: "Georgia",
  },

  /* =====================
            LOGO + SLOGAN
     ===================== */
  centerContent: {
    marginTop: 40,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 54,
    color: "white",
    fontWeight: "700",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 7,
    fontFamily: "Georgia",
  },

  slogan: {
    fontSize: 22,
    color: "white",
    marginTop: 4,
    opacity: 0.93,
    fontStyle: "italic",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    fontFamily: "Georgia",
  },

  /* =====================
         NAPPI ALHAALLA
     ===================== */
  bottomButtonContainer: {
    alignItems: "center",
    marginBottom: 55,
  },

  button: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    backgroundColor: "rgba(0, 125, 90, 0.85)",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Georgia",
  },
});
