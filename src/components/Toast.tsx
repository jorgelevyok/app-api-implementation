import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

import { theme } from "@/constants/theme";

type Props = {
  mensaje: string | null;
  onOcultar: () => void;
};

export function Toast({ mensaje, onOcultar }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const onOcultarRef = useRef(onOcultar);
  onOcultarRef.current = onOcultar;

  useEffect(() => {
    if (!mensaje) {
      return;
    }

    opacity.setValue(0);
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(2200),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onOcultarRef.current();
      }
    });
  }, [mensaje, opacity]);

  if (!mensaje) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.toast, { opacity }]}
      pointerEvents="none"
    >
      <Text style={styles.texto}>{mensaje}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: theme.spacing.md,
    right: theme.spacing.md,
    bottom: 88,
    backgroundColor: theme.colors.success,
    borderRadius: theme.radius.md,
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.md,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  texto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
