// <reference types="expo-router" />
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const bgImage = require("../assets/images/rhino.png");

type Step =
  | "start"
  | "aliveAsk"
  | "location"
  | "animalType"
  | "coordinatesAsk"
  | "coordinatesManual"
  | "extraAsk"
  | "extraInput"
  | "notifyAsk"
  | "done";

type Message = {
  sender: "bot" | "user";
  text: string;
};

export default function ReportInjuredAnimalChat() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("start");
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Welcome ranger! Press report injured animal to begin." },
  ]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { sender: "bot", text }]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  };

  // ------------------------------
  //       GPS LOCATION FETCH
  // ------------------------------
  const fetchGPS = async () => {
    addUserMessage("Use GPS");

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      addBotMessage("Permission denied. Please enter the coordinates manually.");
      setStep("coordinatesManual");
      return;
    }

    addBotMessage("Fetching GPS location…");

    const pos = await Location.getCurrentPositionAsync({});
    const coords = `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;

    addBotMessage(`Coordinates detected: ${coords}`);
    setStep("extraAsk");
  };

  // ------------------------------
  //            SEND INPUT
  // ------------------------------
  const send = () => {
    if (!input.trim()) return;

    addUserMessage(input);

    if (step === "location") {
      addBotMessage("Which type of animal did you observe?");
      setInput("");
      setStep("animalType");
      return;
    }

    if (step === "animalType") {
      addBotMessage("Would you like to use your GPS location?");
      setInput("");
      setStep("coordinatesAsk");
      return;
    }

    if (step === "coordinatesManual") {
      addBotMessage("Would you like to add any additional information?");
      setInput("");
      setStep("extraAsk");
      return;
    }

    if (step === "extraInput") {
      addBotMessage("Would you like to be notified when the area is checked?");
      setInput("");
      setStep("notifyAsk");
      return;
    }

    if (step === "notifyAsk") {
      addBotMessage("Thank you for your report. It has been forwarded successfully.");
      setInput("");
      setStep("done");
      return;
    }
  };

  // ------------------------------
  //      STEP HANDLERS
  // ------------------------------

  const handleStartOption = () => {
    addUserMessage("Report injured animal");
    addBotMessage("Is the animal alive?");
    setStep("aliveAsk");
  };

  const handleAliveYesNo = (answer: "yes" | "no") => {
    addUserMessage(answer === "yes" ? "Alive" : "Dead");
    addBotMessage("Great! Please enter the location of the animal.");
    setStep("location");
  };

  const handleExtraYesNo = (answer: "yes" | "no") => {
    addUserMessage(answer === "yes" ? "Yes" : "No");

    if (answer === "yes") {
      addBotMessage("Please enter additional information below.");
      setStep("extraInput");
    } else {
      addBotMessage(
        "Thank you for your report. It has been forwarded successfully. You can now close the chat."
      );
      setStep("done");
    }
  };

  const handleGPSChoice = (useGPS: boolean) => {
    if (useGPS) {
      fetchGPS();
    } else {
      addUserMessage("Enter manually");
      addBotMessage("Please enter the coordinates (latitude, longitude).");
      setStep("coordinatesManual");
    }
  };

  return (
    <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        {/* Exit Button */}
        <Pressable style={styles.exit} onPress={() => router.push("/home")}>
          <Text style={styles.exitText}>✕</Text>
        </Pressable>

        {/* Chat History */}
        <ScrollView style={styles.chatArea}>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={msg.sender === "bot" ? styles.botBubble : styles.userBubble}
            >
              <Text style={styles.bubbleText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Start Screen */}
        {step === "start" && (
          <View style={styles.startOptions}>
            <Pressable style={styles.startButton} onPress={handleStartOption}>
              <Text style={styles.startButtonText}>Report injured animal</Text>
            </Pressable>
          </View>
        )}

        {/* Alive Yes/No */}
        {step === "aliveAsk" && (
          <View style={styles.yesNoRow}>
            <Pressable style={styles.yesNoButton} onPress={() => handleAliveYesNo("yes")}>
              <Text style={styles.yesNoText}>Alive</Text>
            </Pressable>

            <Pressable style={styles.yesNoButton} onPress={() => handleAliveYesNo("no")}>
              <Text style={styles.yesNoText}>Dead</Text>
            </Pressable>
          </View>
        )}

        {/* GPS Yes/No */}
        {step === "coordinatesAsk" && (
          <View style={styles.yesNoRow}>
            <Pressable style={styles.yesNoButton} onPress={() => handleGPSChoice(true)}>
              <Text style={styles.yesNoText}>Use GPS</Text>
            </Pressable>

            <Pressable style={styles.yesNoButton} onPress={() => handleGPSChoice(false)}>
              <Text style={styles.yesNoText}>Enter manually</Text>
            </Pressable>
          </View>
        )}

        {/* Extra Yes/No */}
        {step === "extraAsk" && (
          <View style={styles.yesNoRow}>
            <Pressable style={styles.yesNoButton} onPress={() => handleExtraYesNo("yes")}>
              <Text style={styles.yesNoText}>Yes</Text>
            </Pressable>

            <Pressable style={styles.yesNoButton} onPress={() => handleExtraYesNo("no")}>
              <Text style={styles.yesNoText}>No</Text>
            </Pressable>
          </View>
        )}

        {/* Input Area */}
        {step !== "start" &&
          step !== "done" &&
          step !== "extraAsk" &&
          step !== "aliveAsk" &&
          step !== "coordinatesAsk" && (
            <View style={styles.inputContainer}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Type here..."
                placeholderTextColor="#aaa"
                style={styles.input}
              />
              <Pressable style={styles.sendBtn} onPress={send}>
                <Text style={styles.sendText}>Send</Text>
              </Pressable>
            </View>
          )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", paddingTop: 40 },
  chatArea: { flex: 1, paddingHorizontal: 16, paddingBottom: 10 },

  botBubble: {
    backgroundColor: "#3f7660",
    padding: 12,
    borderRadius: 18,
    alignSelf: "flex-start",
    marginBottom: 8,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#1f4031",
    padding: 12,
    borderRadius: 18,
    alignSelf: "flex-end",
    marginBottom: 8,
    maxWidth: "80%",
  },
  bubbleText: { color: "white", fontSize: 16 },

  startOptions: { paddingHorizontal: 16, paddingBottom: 10 },
  startButton: {
    backgroundColor: "#3f7660",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },
  startButtonText: { color: "white", fontSize: 16, fontWeight: "600" },

  yesNoRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  yesNoButton: {
    backgroundColor: "#3f7660",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  yesNoText: { color: "white", fontSize: 16, fontWeight: "600" },

  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 18,
    marginRight: 10,
  },

  sendBtn: {
    backgroundColor: "#3f7660",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
  },

  sendText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  exit: { position: "absolute", top: 40, right: 20 },
  exitText: { fontSize: 26, color: "white" },
});
