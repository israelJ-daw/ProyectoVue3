<template>
  <div id="app">
    <Navbar />
    <main class="app-main">
      <router-view />
    </main>
    <MusicPlayer />
    <CustomModal />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
import CustomModal from "@/components/CustomModal.vue";
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Add padding to bottom so content isn't hidden by fixed player */
  padding-bottom: 80px; 
}

.app-main {
  flex: 1; 
}
</style>

