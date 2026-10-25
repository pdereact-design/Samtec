import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import CustomTextInput from "../shared/CustomTextInput";
import PrimaryButton from "../shared/PrimaryButton";

type User = {
  name: string;
  email: string;
  password: string;
};

const USERS_KEY = "samtect-users";
const CURRENT_USER_KEY = "samtect-current-user";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      Alert.alert("SamTect", "Ingresa tu correo electrónico y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const storedUsers = await AsyncStorage.getItem(USERS_KEY);
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find(
        (item) => item.email === normalizedEmail && item.password === password,
      );

      if (!user) {
        Alert.alert(
          "Inicio de sesión fallido",
          "El correo electrónico o la contraseña son incorrectos.",
        );
        return;
      }

      await AsyncStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      );

      router.replace("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      Alert.alert("Error", "No se pudo iniciar sesión. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>¡Bienvenido!</Text>

      <Text style={styles.description}>
        Inicia sesión para descubrir nuestros productos.
      </Text>

      <CustomTextInput
        label="Correo electrónico"
        placeholder="correo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <CustomTextInput
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.forgot}
        onPress={() =>
          Alert.alert(
            "Recuperar contraseña",
            "Esta función estará disponible cuando conectemos un servicio de autenticación.",
          )
        }
      >
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <PrimaryButton
        title={loading ? "Iniciando sesión..." : "Iniciar sesión"}
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
      />

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace("/home")}
      >
        <Text style={styles.secondaryText}>
          Explorar tienda sin iniciar sesión
        </Text>
      </TouchableOpacity>

      <View style={styles.registerRow}>
        <Text style={styles.registerLabel}>¿No tienes una cuenta? </Text>

        <TouchableOpacity onPress={() => router.push("/registro")}>
          <Text style={styles.registerLink}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 23,
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#101828",
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    color: "#667085",
    marginTop: 8,
    marginBottom: 24,
  },
  forgot: {
    alignSelf: "flex-end",
    marginTop: -7,
    marginBottom: 20,
  },
  forgotText: {
    color: "#034EA2",
    fontSize: 12,
    fontWeight: "600",
  },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: 15,
  },
  secondaryText: {
    color: "#034EA2",
    fontWeight: "700",
    fontSize: 13,
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 8,
  },
  registerLabel: {
    fontSize: 12,
    color: "#667085",
  },
  registerLink: {
    fontSize: 12,
    color: "#034EA2",
    fontWeight: "800",
  },
});
