import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: ImageSourcePropType;
};

type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

export default function ProductCard({ product, onAddToCart }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.imageArea}>
        <Image
          source={product.image}
          style={styles.productImage}
          resizeMode="contain"
          accessibilityLabel={product.name}
        />
      </View>

      <Text style={styles.category}>{product.category}</Text>

      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>

      <Text style={styles.description} numberOfLines={2}>
        {product.description}
      </Text>

      <Text style={styles.price}>
        S/{" "}
        {product.price.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
        })}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onAddToCart?.(product)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EAECF0",
  },
  imageArea: {
    height: 145,
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  category: {
    color: "#034EA2",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  name: {
    color: "#101828",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 6,
    minHeight: 38,
  },
  description: {
    color: "#667085",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
    minHeight: 32,
  },
  price: {
    color: "#101828",
    fontSize: 17,
    fontWeight: "900",
    marginTop: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#034EA2",
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
});
