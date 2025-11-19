import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>

      {/* Hide header only for the splash screen */}
      <Stack.Screen
        name="splash"
        options={{ headerShown: false }}
      />

      {/* Default settings for all other screens */}
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "rgba(0,0,0,0.25)",
          },
          headerTitleStyle: {
            fontFamily: "Georgia",
            fontSize: 22,
            fontWeight: "700",
          },
        }}
      />

      {/* Add more screens later with same style */}
    </Stack>
  );
}
