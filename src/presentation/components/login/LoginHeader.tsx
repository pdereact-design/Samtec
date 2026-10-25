import { StyleSheet, Text, View } from "react-native";

export default function LoginHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoLetter}>S</Text>
      </View>

      <Text style={styles.brand}>
        Sam<Text style={styles.brandBlue}>Tect</Text>
      </Text>

      <Text style={styles.subtitle}>La tecnología que conecta contigo.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 66,
    height: 66,
    backgroundColor: "#034EA2",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoLetter: {
    fontSize: 39,
    color: "#FFFFFF",
    fontWeight: "900",
  },
  brand: {
    fontSize: 31,
    fontWeight: "900",
    color: "#101828",
    marginTop: 12,
  },
  brandBlue: {
    color: "#034EA2",
  },
  subtitle: {
    fontSize: 13,
    color: "#667085",
    marginTop: 7,
  },
});
