<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" class="mt-5">
        <v-card>
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <v-btn @click="loginWithGithub" color="primary" block>
              Login with GitHub
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoadingStore } from '@/stores/useLoadingStore';

const router = useRouter();
const authStore = useAuthStore();
const loadingStore = useLoadingStore();

const loginWithGithub = async () => {
  loadingStore.setLoading(true);
  await authStore.loginWithGithub();
  router.push('/');
  loadingStore.setLoading(false);
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
