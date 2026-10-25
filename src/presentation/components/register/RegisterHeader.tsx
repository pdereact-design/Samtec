import { StyleSheet, Text, View } from "react-native";

export default function RegisterHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoLetter}>S</Text>
      </View>

      <Text style={styles.brand}>
        Sam<Text style={styles.brandBlue}>Tect</Text>
      </Text>

      <Text style={styles.subtitle}>
        Crea tu cuenta y descubre nuestra tecnología.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    width: 60,
    height: 60,
    backgroundColor: "#034EA2",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  logoLetter: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  brand: {
    fontSize: 30,
    fontWeight: "900",
    color: "#101828",
    marginTop: 10,
  },
  brandBlue: {
    color: "#034EA2",
  },
  subtitle: {
    color: "#667085",
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },
});
