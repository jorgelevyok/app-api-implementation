import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

import { NuevoPostModal } from "@/components/NuevoPostModal";
import { Toast } from "@/components/Toast";
import { theme } from "@/constants/theme";
import { crearPost, obtenerPosts } from "@/services/api";
import type { Post } from "@/types/post";

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cargandoLista, setCargandoLista] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const cargarLista = useCallback(async (esRefresh = false) => {
    if (esRefresh) {
      setRefrescando(true);
    } else {
      setCargandoLista(true);
    }
    setError(null);

    try {
      const data = await obtenerPosts();
      setPosts(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo cargar. Revisá tu conexión."
      );
    } finally {
      setCargandoLista(false);
      setRefrescando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarLista();
    }, [cargarLista])
  );

  async function handlePublicar(titulo: string, cuerpo: string) {
    setEnviando(true);
    setError(null);

    try {
      await crearPost({
        title: titulo,
        body: cuerpo,
        userId: 1,
      });
      setModalVisible(false);
      setToast("Publicación creada correctamente");
      await cargarLista(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo publicar. Revisá tu conexión."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorTexto}>{error}</Text>
          </View>
        ) : null}

        {cargandoLista ? (
          <View style={styles.centro}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={[
              styles.lista,
              posts.length === 0 && styles.listaVacia,
            ]}
            refreshControl={
              <RefreshControl
                refreshing={refrescando}
                onRefresh={() => cargarLista(true)}
                colors={[theme.colors.primary]}
                tintColor={theme.colors.primary}
              />
            }
            ListEmptyComponent={
              <View style={styles.vacio}>
                <Text style={styles.vacioTitulo}>Sin publicaciones</Text>
                <Text style={styles.vacioTexto}>
                  No hay posts para mostrar. Tirás hacia abajo para actualizar.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitulo}>{item.title}</Text>
                <Text style={styles.cardCuerpo}>{item.body}</Text>
              </View>
            )}
          />
        )}

        <Pressable
          style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
          onPress={() => {
            setError(null);
            setModalKey((k) => k + 1);
            setModalVisible(true);
          }}
          accessibilityRole="button"
          accessibilityLabel="Nueva publicación"
        >
          <Text style={styles.fabTexto}>+</Text>
        </Pressable>

        <NuevoPostModal
          key={modalKey}
          visible={modalVisible}
          cargando={enviando}
          onCerrar={() => setModalVisible(false)}
          onEnviar={handlePublicar}
        />

        <Toast mensaje={toast} onOcultar={() => setToast(null)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  lista: {
    padding: theme.spacing.md,
    paddingBottom: 96,
    gap: theme.spacing.sm,
  },
  listaVacia: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
  },
  cardCuerpo: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.textSecondary,
  },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  vacio: {
    alignItems: "center",
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  vacioTitulo: {
    fontSize: 17,
    fontWeight: "700",
    color: theme.colors.text,
  },
  vacioTexto: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  errorBanner: {
    margin: theme.spacing.md,
    marginBottom: 0,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.errorBg,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  errorTexto: {
    color: theme.colors.error,
    fontSize: 13,
  },
  fab: {
    position: "absolute",
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabPressed: {
    backgroundColor: theme.colors.primaryDark,
  },
  fabTexto: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 34,
  },
});
