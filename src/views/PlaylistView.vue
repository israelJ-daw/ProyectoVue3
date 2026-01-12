<template>
  <div>
    <h2>Mis Playlists</h2>

    <!-- Mensaje si no hay usuario -->
    <div v-if="!user">
      <p>Debes iniciar sesión para ver tus playlists y favoritos.</p>
    </div>

    <!-- Lista de canciones si hay usuario -->
    <div v-else>
      <div v-if="favorites.length">
        <div v-for="song in favorites" :key="song.id" class="favorite-song">
          <img :src="song.album.cover" alt="Album cover" />
          <div>
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist.name }}</p>
            <button @click="removeFromFavorites(song.id)" class="delete-button">Eliminar</button>
          </div>
        </div>
      </div>
      <p v-else>No tienes canciones en tu playlist.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';

// Usuario logueado
const user = ref(JSON.parse(localStorage.getItem('user')) || null);

// Store de favoritos
const favoritesStore = useFavoritesStore();
const uiStore = useUiStore();
const { favorites } = storeToRefs(favoritesStore); // Reactivo correctamente

// Función para eliminar canción
const removeFromFavorites = (songId) => {
  // Buscar la canción antes de eliminar
  const song = favorites.value.find(s => s.id === songId);
  if (!song) return;

  // Eliminar del store
  favoritesStore.removeSong(songId);

  // Mostrar modal
  uiStore.showModal('Eliminado', `${song.title} se eliminó de tus favoritos`, 'error');
};
</script>

<style scoped>
.favorite-song {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.favorite-song img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.favorite-song h3 {
  margin: 0;
}

.favorite-song p {
  margin: 0;
  font-size: 0.9rem;
}

.favorite-song button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.delete-button {
  background-color: #FF4081;
  color: white;
}

.delete-button:hover {
  background-color: #f50057;
}
</style>
