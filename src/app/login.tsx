import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import LoginForm from "../presentation/components/login/LoginForm";
import LoginHeader from "../presentation/components/login/LoginHeader";

export default function LoginScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <LoginHeader />

        <LoginForm />

        <Text style={styles.footer}>SAMTECT · TU MUNDO, MÁS CONECTADO</Text>
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
    paddingVertical: 36,
  },
  content: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  footer: {
    textAlign: "center",
    color: "#98A2B3",
    fontSize: 10,
    letterSpacing: 1.2,
    marginTop: 25,
  },
});
