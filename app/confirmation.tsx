import { Text, View } from "react-native";

export default function ConfirmationScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 30 }}>Report sent!</Text>
      <Text style={{ marginTop: 10 }}>
        Thank you for helping protect wildlife.
      </Text>
    </View>
  );
}
