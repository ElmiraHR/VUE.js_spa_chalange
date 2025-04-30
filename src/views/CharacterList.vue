<template>
  <div class="page-container">
    <h1>Rick and Morty Characters</h1>

    <button class="show-deleted-button" @click="showDeletedModal = true">Show Deleted</button>

    <div v-if="loading">Loading...</div>

    <div v-else class="character-list">
      <div
        v-for="character in characters"
        :key="character.id"
        class="character-card"
        @click="openModal(character)"
      >
        <img :src="character.image" :alt="character.name" />
        <h3>{{ character.name }}</h3>
        <button class="delete-button" @click.stop="deleteCharacter(character.id)">Delete</button>
      </div>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">Prev</button>
      <span>Page {{ page }}</span>
      <button @click="nextPage">Next</button>
    </div>

    <CharacterModal
      v-if="selectedCharacter"
      :character="selectedCharacter"
      :onClose="closeModal"
    />

    <DeletedModal
      v-if="showDeletedModal"
      :deletedIds="deletedIds"
      @close="showDeletedModal = false"
      @restore="restoreCharacter"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import CharacterModal from '@/components/CharacterModal.vue'
import DeletedModal from '@/components/DeletedModal.vue'

export default defineComponent({
  name: 'CharacterList',
  components: { CharacterModal, DeletedModal },
  setup() {
    const characters = ref<any[]>([])
    const deletedIds = ref<number[]>([])
    const loading = ref(true)
    const page = ref(1)
    const totalPages = ref(42)
    const selectedCharacter = ref<any | null>(null)
    const showDeletedModal = ref(false)

    const fetchCharacters = async () => {
      loading.value = true
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page.value}`)
        const data = await res.json()
        const filtered = data.results.filter((c: any) => !deletedIds.value.includes(c.id))
        characters.value = filtered
        await fillToTwenty()
      } catch (err) {
        console.error('Failed to fetch characters', err)
      } finally {
        loading.value = false
      }
    }

    const fillToTwenty = async () => {
      let nextPageToLoad = page.value + 1
      const existingIds = new Set(characters.value.map(c => c.id))

      while (characters.value.length < 20 && nextPageToLoad <= totalPages.value) {
        const res = await fetch(`https://rickandmortyapi.com/api/character?page=${nextPageToLoad}`)
        const data = await res.json()
        const filtered = data.results.filter((c: any) =>
          !deletedIds.value.includes(c.id) && !existingIds.has(c.id)
        )
        characters.value.push(...filtered)
        nextPageToLoad++
      }

      characters.value = characters.value.slice(0, 20)
    }

    const deleteCharacter = (id: number) => {
      deletedIds.value.push(id)
      localStorage.setItem('deletedCharacters', JSON.stringify(deletedIds.value))
      characters.value = characters.value.filter(c => c.id !== id)
      fillToTwenty()
    }

    const restoreCharacter = (id: number) => {
      deletedIds.value = deletedIds.value.filter(deletedId => deletedId !== id)
      localStorage.setItem('deletedCharacters', JSON.stringify(deletedIds.value))
      fetchCharacters()
    }

    const prevPage = () => {
      if (page.value > 1) page.value--
    }

    const nextPage = () => {
      if (page.value < totalPages.value) page.value++
    }

    const openModal = (character: any) => {
      selectedCharacter.value = character
    }

    const closeModal = () => {
      selectedCharacter.value = null
    }

    onMounted(() => {
      const stored = localStorage.getItem('deletedCharacters')
      if (stored) {
        deletedIds.value = JSON.parse(stored)
      }
      fetchCharacters()
    })

    watch(page, fetchCharacters)

    return {
      characters,
      deleteCharacter,
      restoreCharacter,
      loading,
      page,
      prevPage,
      nextPage,
      selectedCharacter,
      openModal,
      closeModal,
      deletedIds,
      showDeletedModal,
    }
  },
})
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 6px;
}

.show-deleted-button {
  margin: 0 auto 10px;
  display: block;
  background-color: #888;
  color: white;
  padding: 6px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.show-deleted-button:hover {
  background-color: #666;
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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 15px;
  justify-items: center;
  align-items: stretch;
  flex: 1;
}

.character-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 240px;
  height: 180px;
  padding: 8px;
  text-align: center;
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.character-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
}

.character-card h3 {
  font-size: 14px;
  margin: 0;
  min-height: 20px;
}

.delete-button {
  margin-bottom: 6px;
  padding: 4px 24px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.delete-button:hover {
  background-color: #e03a3a;
}

.pagination {
  margin: 10px 0;
  text-align: center;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 8px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button[disabled] {
  background-color: #ccc;
  cursor: default;
}
</style>
