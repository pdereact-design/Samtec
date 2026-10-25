import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

import RegisterForm from "../presentation/components/register/RegisterForm";
import RegisterHeader from "../presentation/components/register/RegisterHeader";

export default function RegistroScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <RegisterHeader />
        <RegisterForm />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  content: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
});
