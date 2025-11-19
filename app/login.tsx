/// <reference types="expo-router" />

import { useRouter } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/rhino.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Tumma overlay paremman kontrastin vuoksi */}
      <View style={styles.overlay} />

      {/* Yläkulman Back-nappi */}
      <Pressable style={styles.header} onPress={() => router.back()}>
        <Text style={styles.backText}>←Back</Text>
      </Pressable>

      {/* Login sisältö */}
      <View style={styles.container}>
        <Text style={styles.title}>Log in to your account</Text>

        {/* Username */}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="rgba(255,255,255,0.6)"
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="rgba(255,255,255,0.6)"
          secureTextEntry
        />

        {/* Continue Button */}
        <Pressable style={styles.button} onPress={() => router.push("home")}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  /* Taustakuva */
  background: {
    flex: 1,
    justifyContent: "flex-start",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  /* BACK */
  header: {
    position: "absolute",
    top: 25,
    left: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  backText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Georgia",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },

  /* Login sisältö */
  container: {
    marginTop: 120,
    paddingHorizontal: 30,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 220,
    fontFamily: "Georgia",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },

  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 6,
    fontFamily: "Georgia",
    opacity: 0.9,
  },

  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: "white",
    fontSize: 16,
    marginBottom: 25,
    fontFamily: "Georgia",
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  /* Continue Button */
  button: {
    backgroundColor: "rgba(0,125,90,0.85)",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
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
