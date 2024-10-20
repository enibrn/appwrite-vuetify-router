import { Client, Account, OAuthProvider } from 'appwrite';
import type { Models } from 'appwrite';
import { defineStore } from 'pinia';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_KEY);

const account = new Account(client);

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as Models.User<Models.Preferences> | null,
    isAuthenticated: false as boolean,
  }),
  actions: {
    async loginWithGithub() {
      try {
        //todo configure in upper app
        //await account.createOAuth2Session(OAuthProvider.Github);
        await new Promise(resolve => setTimeout(resolve, 2000));

        await account.createEmailPasswordSession(
          import.meta.env.VITE_AWTEST_EML,
          import.meta.env.VITE_AWTEST_PWD);
        await this.refreshUser();
      } catch (error) {
        console.error('GitHub login failed', error);
      }
    },
    async refreshUser() {
      try {
        const response = await account.get();
        this.user = response;
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Failed to get user', error);
      }
    },
    async logout() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await account.deleteSession('current');
        this.user = null;
        this.isAuthenticated = false;
      } catch (error) {
        console.error('Logout failed', error);
      }
    }
  }
});
