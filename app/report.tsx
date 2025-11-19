/// <reference types="expo-router" />
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ReportScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>Report</Text>

      <Link href="/confirmation" asChild>
        <Pressable
          style={{
            backgroundColor: "#003d29",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            Send report
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
