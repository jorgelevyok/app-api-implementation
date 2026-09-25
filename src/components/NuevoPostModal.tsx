import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { theme } from "@/constants/theme";

type Props = {
  visible: boolean;
  cargando: boolean;
  onCerrar: () => void;
  onEnviar: (titulo: string, cuerpo: string) => void;
};

export function NuevoPostModal({
  visible,
  cargando,
  onCerrar,
  onEnviar,
}: Props) {
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");

  const valido = titulo.trim().length > 0 && cuerpo.trim().length > 0;

  function handleCerrar() {
    if (cargando) {
      return;
    }
    setTitulo("");
    setCuerpo("");
    onCerrar();
  }

  function handleEnviar() {
    if (!valido || cargando) {
      return;
    }
    onEnviar(titulo.trim(), cuerpo.trim());
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={handleCerrar}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable style={styles.backdrop} onPress={handleCerrar} />

        <View style={styles.sheet}>
          <Text style={styles.titulo}>Nueva publicación</Text>

          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="¿De qué se trata?"
            placeholderTextColor={theme.colors.textSecondary}
            editable={!cargando}
            returnKeyType="next"
          />

          <Text style={styles.label}>Contenido</Text>
          <TextInput
            style={[styles.input, styles.inputMultilinea]}
            value={cuerpo}
            onChangeText={setCuerpo}
            placeholder="Escribí tu nota..."
            placeholderTextColor={theme.colors.textSecondary}
            editable={!cargando}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <View style={styles.acciones}>
            <Pressable
              style={({ pressed }) => [
                styles.boton,
                styles.botonCancelar,
                pressed && !cargando && styles.botonCancelarPressed,
              ]}
              onPress={handleCerrar}
              disabled={cargando}
            >
              <Text style={styles.botonCancelarTexto}>Cancelar</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.boton,
                styles.botonEnviar,
                (!valido || cargando) && styles.botonDeshabilitado,
                pressed && valido && !cargando && styles.botonEnviarPressed,
              ]}
              onPress={handleEnviar}
              disabled={!valido || cargando}
            >
              {cargando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.botonEnviarTexto}>Publicar</Text>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
  },
  sheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.xs,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginTop: theme.spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
  inputMultilinea: {
    minHeight: 110,
    paddingTop: 12,
  },
  acciones: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  boton: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  botonCancelar: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  botonCancelarPressed: {
    backgroundColor: theme.colors.border,
  },
  botonCancelarTexto: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  botonEnviar: {
    backgroundColor: theme.colors.primary,
  },
  botonEnviarPressed: {
    backgroundColor: theme.colors.primaryDark,
  },
  botonEnviarTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  botonDeshabilitado: {
    opacity: 0.5,
  },
});
