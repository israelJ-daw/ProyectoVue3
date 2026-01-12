<template>
  <div v-if="currentTrack" class="music-player-bar">
    <div class="player-content">
      <!-- Información de la Pista -->
      <div class="track-info">
        <img :src="currentTrack.album?.cover_medium || currentTrack.album?.cover" alt="Cover" class="cover-thumb" />
        <div class="track-details">
          <span class="track-title">{{ currentTrack.title }}</span>
          <span class="track-artist">{{ currentTrack.artist?.name }}</span>
        </div>
      </div>

      <!-- Controles -->
      <div class="player-controls">
        <button class="control-btn" @click="togglePlay">
          {{ isPlaying ? "⏸" : "▶" }}
        </button>
      </div>

      <!-- Progreso -->
      <div class="progress-container">
        <span class="time">{{ formatTime(currentTime) }}</span>
        <input
          type="range"
          :value="progress"
          @input="seek"
          min="0"
          max="100"
          class="progress-slider"
        />
        <span class="time">{{ formatTime(duration) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { usePlayerStore } from "@/stores/player";
import { storeToRefs } from "pinia";

const playerStore = usePlayerStore();
const { currentTrack, isPlaying } = storeToRefs(playerStore);
const { togglePlay } = playerStore;

const audio = new Audio();
const currentTime = ref(0);
const duration = ref(30);
const progress = ref(0);

// Observar cambios de pista
watch(currentTrack, (newTrack) => {
  if (newTrack) {
    audio.src = newTrack.preview;
    audio.play()
      .then(() => { isPlaying.value = true; })
      .catch(e => console.error("Error playing:", e));
  }
});

// Observar cambios de estado de reproducción/pausa desde el store
watch(isPlaying, (playing) => {
  if (playing) {
    audio.play();
  } else {
    audio.pause();
  }
});

const updateProgress = () => {
  currentTime.value = audio.currentTime;
  progress.value = (audio.currentTime / duration.value) * 100;
};

const seek = (event) => {
  const newTime = (event.target.value / 100) * duration.value;
  audio.currentTime = newTime;
  currentTime.value = newTime;
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

onMounted(() => {
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", () => {
    isPlaying.value = false;
    progress.value = 0;
  });
});

onUnmounted(() => {
  audio.pause();
  audio.removeEventListener("timeupdate", updateProgress);
  audio.src = "";
});
</script>

<style scoped>
.music-player-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid #333;
  padding: 10px 20px;
  z-index: 1000;
  color: FF4081FF4081;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.4);
}

.player-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.track-info {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 250px;
}

.cover-thumb {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: cover;
}

.track-details {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.track-title {
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.track-artist {
  font-size: 0.85rem;
  color: #aaa;
}

.control-btn {
  background: #FF4081;
  color: #FF4081;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.control-btn:hover {
  transform: scale(1.1);
}

.progress-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-slider {
  flex: 1;
  height: 4px;
  cursor: pointer;
  accent-color: #FF4081;
}

.time {
  font-size: 0.8rem;
  color: #ccc;
  min-width: 35px;
}

@media (max-width: 768px) {
  .player-content {
    flex-direction: column;
    padding-bottom: 10px;
  }
  .track-info {
    width: 100%;
    margin-bottom: 10px;
  }
  .progress-container {
    width: 100%;
  }
}
</style>

  