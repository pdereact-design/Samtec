import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  userName?: string;
  onLogout?: () => void;
};

export default function HomeHeader({ userName = "Usuario", onLogout }: Props) {
  const firstName = userName.trim().split(/\s+/)[0] || "Usuario";

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.brand}>
          Sam<Text style={styles.brandBlue}>Tect</Text>
        </Text>

        <Text style={styles.greeting}>Hola, {firstName} 👋</Text>

        <Text style={styles.subtitle}>
          Encuentra tu próxima tecnología favorita.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={onLogout}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Cerrar sesión"
      >
        <Text style={styles.profileLetter}>
          {firstName.charAt(0).toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  info: {
    flex: 1,
  },
  brand: {
    fontSize: 28,
    fontWeight: "900",
    color: "#101828",
  },
  brandBlue: {
    color: "#034EA2",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "800",
    color: "#101828",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 12,
    color: "#667085",
    marginTop: 5,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#034EA2",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  profileLetter: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
});
