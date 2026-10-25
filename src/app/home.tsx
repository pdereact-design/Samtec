import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import CategoryList from "../presentation/components/home/CategoryList";
import HomeHeader from "../presentation/components/home/HomeHeader";
import ProductCard, {
    Product,
} from "../presentation/components/home/ProductCard";

type CurrentUser = {
  name?: string;
  email?: string;
};

const CURRENT_USER_KEY = "samtect-current-user";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Samsung Galaxy S25 Ultra",
    category: "celulares",
    price: 4899,
    description: "Potencia, cámara avanzada y Galaxy AI.",
    image: require("../../assets/images/galaxy-s25-ultra.png"),
  },
  {
    id: "2",
    name: "Samsung Galaxy A56",
    category: "celulares",
    price: 1699,
    description: "Pantalla Super AMOLED y gran batería.",
    image: require("../../assets/images/galaxy-a56.png"),
  },
  {
    id: "3",
    name: "Samsung Galaxy Tab S10",
    category: "tablets",
    price: 2899,
    description: "Ideal para estudiar y trabajar.",
    image: require("../../assets/images/galaxy-tab-s10.png"),
  },
  {
    id: "4",
    name: 'Samsung Smart TV 55"',
    category: "televisores",
    price: 2199,
    description: "Pantalla grande para tu entretenimiento.",
    image: require("../../assets/images/samsung-tv.png"),
  },
  {
    id: "5",
    name: "Galaxy Buds",
    category: "accesorios",
    price: 499,
    description: "Audio inalámbrico para tu día a día.",
    image: require("../../assets/images/galaxy-buds.png"),
  },
  {
    id: "6",
    name: "Galaxy Watch",
    category: "accesorios",
    price: 899,
    description: "Controla tu actividad y tus notificaciones.",
    image: require("../../assets/images/galaxy-watch.png"),
  },
];

export default function HomeScreen() {
  const [userName, setUserName] = useState("Usuario");
  const [category, setCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(CURRENT_USER_KEY);

        if (storedUser) {
          const user: CurrentUser = JSON.parse(storedUser);
          if (user.name?.trim()) {
            setUserName(user.name.trim());
          }
        }
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      }
    };

    loadUser();
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        category === "todos" || product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const handleAddToCart = (product: Product) => {
    setCart((currentCart) => [...currentCart, product]);

    Alert.alert("Producto agregado", `${product.name} se agregó al carrito.`);
  };

  const showCart = () => {
    if (cart.length === 0) {
      Alert.alert("Mi carrito", "Tu carrito está vacío.");
      return;
    }

    const items = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} - S/ ${item.price.toFixed(2)}`,
      )
      .join("\n");

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    Alert.alert("Mi carrito", `${items}\n\nTotal: S/ ${total.toFixed(2)}`);
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Deseas salir de tu cuenta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem(CURRENT_USER_KEY);
          } catch (error) {
            console.error("Error al cerrar sesión:", error);
          }

          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <HomeHeader userName={userName} onLogout={handleLogout} />

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos Samsung..."
            placeholderTextColor="#98A2B3"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            returnKeyType="search"
          />
        </View>

        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerLabel}>SAMTECT STORE</Text>

            <Text style={styles.bannerTitle}>
              La tecnología{"\n"}a tu alcance.
            </Text>

            <Text style={styles.bannerDescription}>
              Descubre tus próximos favoritos.
            </Text>
          </View>

          <Text style={styles.bannerEmoji}>✨</Text>
        </View>

        <CategoryList onSelectCategory={setCategory} />

        <View style={styles.sectionHeader}>
          <View style={styles.sectionInfo}>
            <Text style={styles.sectionTitle}>Productos destacados</Text>

            <Text style={styles.sectionSubtitle}>
              {filteredProducts.length} productos disponibles
            </Text>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={showCart}
            activeOpacity={0.8}
          >
            <Text style={styles.cartText}>🛒 {cart.length}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </View>

        {filteredProducts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No encontramos productos</Text>

            <Text style={styles.emptyDescription}>
              Prueba con otra búsqueda o categoría.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>SAMTECT · TU MUNDO, MÁS CONECTADO</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  scroll: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 35,
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
  },
  searchContainer: {
    height: 49,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EC",
    borderRadius: 12,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  searchIcon: {
    color: "#667085",
    fontSize: 25,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#101828",
  },
  banner: {
    minHeight: 175,
    backgroundColor: "#034EA2",
    borderRadius: 20,
    padding: 21,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
    overflow: "hidden",
  },
  bannerContent: {
    flex: 1,
  },
  bannerLabel: {
    color: "#BFD7FF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    marginTop: 9,
    lineHeight: 31,
  },
  bannerDescription: {
    color: "#E5EEFF",
    fontSize: 11,
    marginTop: 9,
  },
  bannerEmoji: {
    fontSize: 48,
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 17,
  },
  sectionInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#101828",
  },
  sectionSubtitle: {
    color: "#667085",
    fontSize: 12,
    marginTop: 5,
  },
  cartButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E7EC",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginLeft: 10,
  },
  cartText: {
    color: "#034EA2",
    fontWeight: "800",
    fontSize: 13,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 35,
  },
  emptyTitle: {
    color: "#101828",
    fontSize: 16,
    fontWeight: "800",
  },
  emptyDescription: {
    color: "#667085",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    backgroundColor: "#FFFFFF",
    borderRadius: 11,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 25,
  },
  logoutText: {
    color: "#344054",
    fontSize: 13,
    fontWeight: "700",
  },
  footer: {
    color: "#98A2B3",
    fontSize: 10,
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 22,
  },
});
