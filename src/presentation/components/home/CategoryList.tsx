import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const CATEGORIES = [
  { id: "todos", name: "Todos" },
  { id: "celulares", name: "Celulares" },
  { id: "tablets", name: "Tablets" },
  { id: "televisores", name: "TV y audio" },
  { id: "accesorios", name: "Accesorios" },
];

type Props = {
  onSelectCategory?: (category: string) => void;
};

export default function CategoryList({ onSelectCategory }: Props) {
  const [selected, setSelected] = useState("todos");

  const handleSelect = (category: string) => {
    setSelected(category);
    onSelectCategory?.(category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorías</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {CATEGORIES.map((category) => {
          const active = selected === category.id;

          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.category, active && styles.categoryActive]}
              onPress={() => handleSelect(category.id)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.categoryText,
                  active && styles.categoryTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },
  title: {
    fontSize: 19,
    fontWeight: "800",
    color: "#101828",
    marginBottom: 15,
  },
  list: {
    gap: 10,
    paddingRight: 10,
  },
  category: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    backgroundColor: "#FFFFFF",
  },
  categoryActive: {
    backgroundColor: "#034EA2",
    borderColor: "#034EA2",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475467",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
});
