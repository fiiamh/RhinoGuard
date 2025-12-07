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
  | "done"
  | "checkLocation"
  | "checking"
  | "checkResult"
  | "checkAgain";

type Message = {
  sender: "bot" | "user";
  text: string;
};

// Utility function to generate random status messages
function generateRandomStatus(location: string) {
  const hours = () => Math.floor(Math.random() * 12) + 1;

  const observations = ["no abnormalities", "suspicious behaviour detected"];
  const patrols = ["completed", "not completed"];

  // 🔥 Arvotaan vain observation ja patrol
  const observation = observations[Math.floor(Math.random() * observations.length)];
  const patrol = patrols[Math.floor(Math.random() * patrols.length)];

  // 🔥 Sidotaan situation aina observationiin
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

export default function ReportPoachingChat() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("start");
  const [input, setInput] = useState("");

  const [location, setLocation] = useState("");
  const [observation, setObservation] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const [extraInfo, setExtraInfo] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Please choose an option:" },
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
      setLocation(input);
      setInput("");
      addBotMessage(
        "Thank you! Could you describe what you observed in a few words?"
      );
      setStep("observation");
      return;
    }

    if (step === "observation") {
      setObservation(input);
      setInput("");
      addBotMessage("Thank you! How long ago was the observation made?");
      setStep("time");
      return;
    }

    if (step === "time") {
      setTimeAgo(input);
      setInput("");
      addBotMessage(
        "OK. Would you like to add any other information about this observation? For example, the color of the car and the number of suspicious persons?"
      );
      setStep("extraAsk");
      return;
    }

    if (step === "extraInput") {
      setExtraInfo(input);
      setInput("");
      addBotMessage(
        "Would you like to be notified when the area has been checked? (Yes / No)"
      );
      setStep("notifyAsk");
      return;
    }

    if (step === "notifyAsk") {
      // käyttäjä kirjoittaa Yes / No, mutta molemmat johtavat samaan lopetukseen
      setInput("");
      addBotMessage(
        "OK. Thank you for your report. Your notification has been successfully received and forwarded. You can now close the conversation."
      );
      setStep("done");
      return;
    }

    if (step === "checkLocation") {
      setLocation(input);
      setInput("");
      addBotMessage(`Thank you. Please wait a moment while we check the information for the area ${input}.`);
      addBotMessage(`Searching for the latest information on ${input}...`);
      setStep("checking");

      setTimeout(() => {
  const status = generateRandomStatus(input);
  addBotMessage(status.trim());
  addBotMessage("Would you like to check another area? (Yes / No)");
  setStep("checkResult");
}, 1500);

      return;
    }

    if (step === "checkResult") {
      const answer = input.toLowerCase();
      setInput("");

      if (answer === "yes") {
        addBotMessage("Enter the name or location of the new area.");
        setStep("checkLocation");
      } else {
        addBotMessage(
          "Okay. Please stay alert and let us know if you notice anything unusual. You can now close this conversation."
        );
        setStep("checkAgain");
      }
    }
  };

  const handleStartOption = (option: "report" | "check") => {
    if (option === "report") {
      addUserMessage("Report observation");
      addBotMessage(
        "Thank you! Where was the observation made? You can enter the location, place, or area name here."
      );
      setStep("location");
    } else {
      addUserMessage("Check a previous situation");
      addBotMessage(
        "OK, you want to check a previous situation. Which location or place are you interested in? Enter its name or location."
      );
      setStep("checkLocation");
    }
  };

  const handleExtraYesNo = (answer: "yes" | "no") => {
    addUserMessage(answer === "yes" ? "Yes" : "No");

    if (answer === "yes") {
      addBotMessage("Please write the additional information here.");
      setStep("extraInput");
    } else {
      addBotMessage(
        "Thank you for your report, your report has been successfully received and forwarded. You can now close the conversation."
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
        {/* EXIT BUTTON */}
        <Pressable style={styles.exit} onPress={() => router.push("/home")}>
          <Text style={styles.exitText}>✕</Text>
        </Pressable>

        {/* CHAT HISTORY */}
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

        {/* START OPTIONS AS SEPARATE BUTTONS */}
        {step === "start" && (
          <View style={styles.startOptions}>
            <Pressable
              style={styles.startButton}
              onPress={() => handleStartOption("report")}
            >
              <Text style={styles.startButtonText}>1. Report observation</Text>
            </Pressable>
            <Pressable
              style={styles.startButton}
              onPress={() => handleStartOption("check")}
            >
              <Text style={styles.startButtonText}>
                2. Check a previous situation
              </Text>
            </Pressable>
          </View>
        )}

        {/* YES / NO BUTTONS ONLY FOR EXTRA QUESTION */}
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

        {/* INPUT AREA (EI NÄY DONE-VAIHEESSA) */}
        {step !== "done" && (
          <View style={styles.inputContainer}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type your response..."
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

/* STYLES */

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingTop: 40,
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
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
  bubbleText: {
    color: "white",
    fontSize: 16,
  },
  startOptions: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  startButton: {
    backgroundColor: "#3f7660",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  startButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
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
  yesNoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: "#3f7660",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  sendText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  exit: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  exitText: {
    fontSize: 26,
    color: "white",
  },
})
