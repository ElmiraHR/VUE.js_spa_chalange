<template>
  <div class="page-container">
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
        <button @click="deleteCharacter(character.id)">Delete</button>
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
    const deletedIds = ref<number[]>([])
    const loading = ref(true)

    const fetchCharacters = async () => {
      try {
        const res = await fetch('https://rickandmortyapi.com/api/character?page=1')
        const data = await res.json()
        characters.value = data.results.filter(
          (c: any) => !deletedIds.value.includes(c.id)
        )
      } catch (err) {
        console.error('Failed to fetch characters', err)
      } finally {
        loading.value = false
      }
    }

    const deleteCharacter = (id: number) => {
      deletedIds.value.push(id)
      localStorage.setItem('deletedCharacters', JSON.stringify(deletedIds.value))
      characters.value = characters.value.filter(c => c.id !== id)
    }

    onMounted(() => {
      const stored = localStorage.getItem('deletedCharacters')
      if (stored) {
        deletedIds.value = JSON.parse(stored)
      }
      fetchCharacters()
    })

    return {
      characters,
      deleteCharacter,
      loading,
    }
  },
})
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.page-container {
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

.character-list {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;
  align-items: stretch;
}

.character-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 260px;
  min-height: 200px;
  padding: 10px;
  text-align: center;
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.character-card img {
  width: 100%;
  border-radius: 6px;
}

.character-card h3 {
  font-size: 16px;
  margin: 10px 0;
  min-height: 40px;
}

button {
  margin-top: auto;
  padding: 5px 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
