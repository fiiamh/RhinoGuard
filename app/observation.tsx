/// <reference types="expo-router" />
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ObservationResult() {
  const router = useRouter();
  const { animal } = useLocalSearchParams(); 

  const [showMessage, setShowMessage] = useState(false);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.header} onPress={() => router.back()}>
        <Text style={styles.backText}>⟵ Back</Text>
      </Pressable>

      {/* Title */}
      <Text style={styles.title}>
        Do you want to report this observation?
      </Text>

      {/* YES / NO BUTTONS */}
      {!showMessage && (
        <>
          <Pressable
            style={styles.yesButton}
            onPress={() => router.push("/report-poaching")}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </Pressable>

          <Pressable
            style={styles.noButton}
            onPress={() => setShowMessage(true)}
          >
            <Text style={styles.buttonText}>No</Text>
          </Pressable>
        </>
      )}

      {/* MESSAGE WHEN NO IS PRESSED */}
      {showMessage && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            Thank you! You can return to home page.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 30,
    backgroundColor: "#b4d9c4",
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
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
    fontFamily: "Georgia",
  },
  yesButton: {
    backgroundColor: "rgba(0,125,90,0.85)",
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  noButton: {
    backgroundColor: "#8e8e8e",
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Georgia",
  },
  messageBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  messageText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Georgia",
    textAlign: "center",
  },
});
