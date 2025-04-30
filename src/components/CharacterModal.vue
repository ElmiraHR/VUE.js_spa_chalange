<template>
  <div class="modal-overlay" @click.self="onClose">
    <div class="modal-content">
      <button class="close-icon" @click="onClose">×</button>
      <img :src="character.image" :alt="character.name" />
      <h2>{{ character.name }}</h2>
      <p><strong>Status:</strong> {{ character.status }}</p>
      <p><strong>Species:</strong> {{ character.species }}</p>
      <p><strong>Gender:</strong> {{ character.gender }}</p>
      <p><strong>Origin:</strong> {{ character.origin.name }}</p>
      <p><strong>Location:</strong> {{ character.location.name }}</p>

      <div v-if="loadingEpisodes">Loading episodes...</div>
      <div v-else>
        <p><strong>Episodes:</strong></p>
        <ul class="episodes-list">
          <li v-for="ep in episodes" :key="ep.id">
            {{ ep.episode }} — {{ ep.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'CharacterModal',
  props: {
    character: {
      type: Object as PropType<any>,
      required: true,
    },
    onClose: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    const episodes = ref<any[]>([])
    const loadingEpisodes = ref(true)

    const fetchEpisodes = async () => {
      try {
        const results = await Promise.all(
          props.character.episode.map((url: string) => fetch(url).then(res => res.json()))
        )
        episodes.value = results
      } catch (error) {
        console.error('Failed to load episode data', error)
      } finally {
        loadingEpisodes.value = false
      }
    }

    onMounted(fetchEpisodes)

    return {
      episodes,
      loadingEpisodes,
    }
  },
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 40px 20px;
  width: 40%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: left;
  position: relative;
}

.modal-content img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}

.modal-content h2 {
  margin-top: 0;
}

.episodes-list {
  list-style-type: disc;
  padding-left: 20px;
}

.episodes-list a {
  color: #007acc;
  text-decoration: none;
  word-break: break-word;
}

.episodes-list a:hover {
  text-decoration: underline;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 12px;
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
}

.close-icon:hover {
  color: #000;
}
</style>
