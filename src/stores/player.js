import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlayerStore = defineStore('player', () => {
  const currentTrack = ref(null);
  const isPlaying = ref(false);

  const playTrack = (track) => {
    currentTrack.value = track;
    isPlaying.value = true;
  };

  const togglePlay = () => {
    if (currentTrack.value) {
      isPlaying.value = !isPlaying.value;
    }
  };

  return {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay
  };
});
