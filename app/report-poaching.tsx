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

type Step =
  | "start"
  | "location"
  | "observation"
  | "time"
  | "extraAsk"
  | "extraInput"
  | "notifyAsk"
  | "done";

type Message = {
  sender: "bot" | "user";
  text: string;
};

export default function ReportPoachingChat() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("start");
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Welcome ranger! Press report observation to begin." },
  ]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { sender: "bot", text }]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  };

  const send = () => {
    if (!input.trim()) return;

    addUserMessage(input);

    if (step === "location") {
      addBotMessage("Thank you! Please describe what you observed.");
      setInput("");
      setStep("observation");
      return;
    }

    if (step === "observation") {
      addBotMessage("How long ago was the observation made?");
      setInput("");
      setStep("time");
      return;
    }

    if (step === "time") {
      addBotMessage(
        "Would you like to add any additional information?"
      );
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
      addBotMessage(
        "Thank you for your report. It has been forwarded successfully."
      );
      setInput("");
      setStep("done");
      return;
    }
  };

  const handleStartOption = () => {
    addUserMessage("Report observation");
    addBotMessage(
      "Great! Where was the observation made? Enter the location below."
    );
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

  return (
    <ImageBackground
      source={bgImage}
      style={styles.background}
      resizeMode="cover"
    >
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
            <Pressable
              style={styles.startButton}
              onPress={handleStartOption}
            >
              <Text style={styles.startButtonText}>Report observation</Text>
            </Pressable>
          </View>
        )}

        {/* Extra Yes/No */}
        {step === "extraAsk" && (
          <View style={styles.yesNoRow}>
            <Pressable
              style={styles.yesNoButton}
              onPress={() => handleExtraYesNo("yes")}
            >
              <Text style={styles.yesNoText}>Yes</Text>
            </Pressable>

            <Pressable
              style={styles.yesNoButton}
              onPress={() => handleExtraYesNo("no")}
            >
              <Text style={styles.yesNoText}>No</Text>
            </Pressable>
          </View>
        )}

        {/* Input Area */}
        {step !== "start" && step !== "done" && step !== "extraAsk" && (
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
