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

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (loading) return;

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password || !confirmPassword) {
      Alert.alert("SamTect", "Completa todos los campos.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(normalizedEmail)) {
      Alert.alert("Correo inválido", "Ingresa un correo electrónico válido.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Contraseña inválida",
        "La contraseña debe tener al menos 6 caracteres.",
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Las contraseñas no coinciden",
        "Verifica que ambas contraseñas sean iguales.",
      );
      return;
    }

    setLoading(true);

    try {
      const storedUsers = await AsyncStorage.getItem(USERS_KEY);
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const existingUser = users.some((user) => user.email === normalizedEmail);

      if (existingUser) {
        Alert.alert(
          "Correo ya registrado",
          "Esta cuenta ya existe. Puedes iniciar sesión.",
          [
            {
              text: "Ir al login",
              onPress: () => router.replace("/login"),
            },
            { text: "Cancelar", style: "cancel" },
          ],
        );
        return;
      }

      const newUser: User = {
        name: normalizedName,
        email: normalizedEmail,
        password,
      };

      users.push(newUser);

      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      Alert.alert(
        "¡Registro completado!",
        "Tu cuenta SamTect se creó correctamente. Ahora puedes iniciar sesión.",
        [
          {
            text: "Iniciar sesión",
            onPress: () => router.replace("/login"),
          },
        ],
        { cancelable: false },
      );
    } catch (error) {
      console.error("Error al registrar usuario:", error);

      Alert.alert(
        "Error",
        "No se pudo completar el registro. Inténtalo nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Crear cuenta</Text>

      <Text style={styles.description}>
        Regístrate para descubrir nuestra tienda.
      </Text>

      <CustomTextInput
        label="Nombre completo"
        placeholder="Tu nombre"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoCorrect={false}
      />

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
        placeholder="Mínimo 6 caracteres"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <CustomTextInput
        label="Confirmar contraseña"
        placeholder="Repite tu contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <PrimaryButton
        title={loading ? "Creando cuenta..." : "Crear cuenta"}
        onPress={handleRegister}
        loading={loading}
        disabled={loading}
      />

      <View style={styles.loginRow}>
        <Text style={styles.loginLabel}>¿Ya tienes una cuenta? </Text>

        <TouchableOpacity
          onPress={() => router.replace("/login")}
          disabled={loading}
        >
          <Text style={styles.loginLink}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },
  title: {
    color: "#101828",
    fontSize: 25,
    fontWeight: "800",
  },
  description: {
    color: "#667085",
    fontSize: 13,
    marginTop: 8,
    marginBottom: 22,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 22,
  },
  loginLabel: {
    color: "#667085",
    fontSize: 12,
  },
  loginLink: {
    color: "#034EA2",
    fontSize: 12,
    fontWeight: "800",
  },
});
