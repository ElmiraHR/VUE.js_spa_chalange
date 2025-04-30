<template>
  <div>
    <h1>Rick and Morty Characters</h1>

    <div v-if="loading">Loading...</div>

    <div v-else class="character-list">
      <div
        v-for="character in characters"
        :key="character.id"
        class="character-card"
      >
        <img :src="character.image" :alt="character.name" />
        <h3>{{ character.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'CharacterList',
  setup() {
    const characters = ref<any[]>([])
    const loading = ref(true)

    const fetchCharacters = async () => {
      try {
        const res = await fetch('https://rickandmortyapi.com/api/character?page=1')
        const data = await res.json()
        characters.value = data.results
      } catch (err) {
        console.error('Failed to fetch characters', err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchCharacters()
    })

    return {
      characters,
      loading,
    }
  },
})
</script>

<style scoped>
.character-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.character-card {
  width: 150px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background-color: #f3f3f3;
}

.character-card img {
  width: 100%;
  border-radius: 6px;
}
</style>
