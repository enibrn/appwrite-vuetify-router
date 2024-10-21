<template>
  <v-app>
    <v-navigation-drawer
      v-if="isAuthenticated"
      v-model="drawer"
    >
    </v-navigation-drawer>

    <v-app-bar v-if="isAuthenticated">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>appwrite-vuetify-router</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-dots-vertical"
            v-bind="props"
          >
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
      <v-overlay
        v-model="isLoading"
        class="align-center justify-center"
      >
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoadingStore } from '@/stores/useLoadingStore';

const router = useRouter();
const authStore = useAuthStore();
const loadingStore = useLoadingStore();

const drawer = ref(null);

const isLoading = computed(() => loadingStore.isLoading);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const logout = async () => {
  loadingStore.setLoading(true);
  await authStore.logout();
  router.push('/login');
  loadingStore.setLoading(false);
};
</script>