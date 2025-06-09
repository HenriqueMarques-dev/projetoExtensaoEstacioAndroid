import { initialize } from "@/database/initialize";
import { getUserEmail } from "@/utils/storage";
import { Slot, router, usePathname } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    async function checkSession() {
      const storedEmail = await getUserEmail("userEmail");

      if (storedEmail && pathname === "/") {
        router.replace("/home");
      }

      if (!storedEmail && pathname.startsWith("/home")) {
        router.replace("/");
      }

      setLoading(false);
    }

    checkSession();
  }, [pathname]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SQLiteProvider databaseName="database.db" onInit={initialize}>
      <Slot />
    </SQLiteProvider>
  );
}
