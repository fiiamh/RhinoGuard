/// <reference types="expo-router" />
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

// Random situation generator
function generateRandomStatus(location: string) {
  const hours = () => Math.floor(Math.random() * 12) + 1;

  const observations = ["no abnormalities", "suspicious behaviour detected"];
  const patrols = ["completed", "not completed"];

  const observation = observations[Math.floor(Math.random() * observations.length)];
  const patrol = patrols[Math.floor(Math.random() * patrols.length)];
  const situation = observation === "no abnormalities" ? "safe" : "not safe";

  return {
    message: `
Here is the latest situation in the area ${location}:
Latest observation: ${observation} (${hours()} hours ago)
Latest patrol: ${patrol} (${hours()} hours ago)
Situation: ${situation}
`,
    observation,
    patrol,
    situation,
  };
}

export default function CheckStatus() {
  const router = useRouter();

  const [step, setStep] = useState<"start" | "checking" | "result" | "done">("start");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Which location or place would you like to check?" },
  ]);

  const addMessage = (sender: "bot" | "user", text: string) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const send = () => {
    if (!input.trim()) return;

    addMessage("user", input);

    if (step === "start") {
      const location = input;
      addMessage("bot", `Thank you. Checking area ${location}...`);
      setInput("");
      setStep("checking");

      setTimeout(() => {
        const status = generateRandomStatus(location);
        addMessage("bot", status.message.trim());
        addMessage("bot", "Would you like to check another area?");

        setStep("result");
      }, 1200);

      return;
    }
  };

  // --- HANDLE YES/NO BUTTONS WHEN ASKING TO CHECK ANOTHER AREA ---
  const handleResultYesNo = (answer: "yes" | "no") => {
    if (answer === "yes") {
      addMessage("user", "Yes");
      addMessage("bot", "Enter the name of the new area you want to check:");
      setStep("start");
    } else {
      addMessage("user", "No");
      addMessage("bot", "Thank you! Stay alert and report anything unusual. You can now close the chat.");
      setStep("done");
    }
  };

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.overlay}>

        {/* EXIT BUTTON */}
        <Pressable style={styles.exit} onPress={() => router.push("/home")}>
          <Text style={styles.exitText}>✕</Text>
        </Pressable>

        {/* CHAT */}
        <ScrollView style={styles.chat}>
          {messages.map((msg, i) => (
            <View key={i} style={msg.sender === "bot" ? styles.bot : styles.user}>
              <Text style={styles.chatText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* YES / NO BUTTONS FOR RESULT STEP */}
        {step === "result" && (
          <View style={styles.yesNoRow}>
            <Pressable
              style={styles.yesNoButton}
              onPress={() => handleResultYesNo("yes")}
            >
              <Text style={styles.yesNoText}>Yes</Text>
            </Pressable>

            <Pressable
              style={styles.yesNoButton}
              onPress={() => handleResultYesNo("no")}
            >
              <Text style={styles.yesNoText}>No</Text>
            </Pressable>
          </View>
        )}

        {/* INPUT FIELD (hidden only when finished) */}
        {step !== "done" && step !== "result" && (
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

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)" },

  chat: { flex: 1, padding: 16 },

  bot: {
    backgroundColor: "#3f7660",
    padding: 12,
    borderRadius: 18,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  user: {
    backgroundColor: "#1f4031",
    padding: 12,
    borderRadius: 18,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  chatText: { color: "white", fontSize: 16 },

  /* --- YES/NO BUTTON STYLE --- */
  yesNoRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  yesNoButton: {
    backgroundColor: "#3f7660",
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 20,
  },
  yesNoText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  /* --- LARGER INPUT + SEND BUTTON --- */
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
    paddingVertical: 16,
    fontSize: 18,
    marginRight: 10,
  },

  sendBtn: {
    backgroundColor: "#3f7660",
    paddingHorizontal: 28,
    paddingVertical: 16,
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
