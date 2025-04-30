<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-button" @click="$emit('close')">✕</button>
      <h2>Deleted Characters</h2>

      <div v-if="loading">Loading...</div>

      <ul v-else>
        <li v-for="char in deletedCharacters" :key="char.id">
          <img :src="char.image" :alt="char.name" />
          <span>{{ char.name }}</span>
          <button @click="$emit('restore', char.id)">Restore</button>
        </li>
        <li v-if="!deletedCharacters.length && !loading">No deleted characters</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'DeletedModal',
  props: {
    deletedIds: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
  setup(props) {
    const deletedCharacters = ref<any[]>([])
    const loading = ref(false)

    const fetchDeleted = async () => {
      loading.value = true
      const results: any[] = []
      for (const id of props.deletedIds) {
        try {
          const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
          const data = await res.json()
          results.push(data)
        } catch (e) {
          console.error(`Error fetching character with id ${id}`, e)
        }
      }
      deletedCharacters.value = results
      loading.value = false
    }

    watch(() => props.deletedIds, fetchDeleted, { immediate: true })

    return {
      deletedCharacters,
      loading,
    }
  },
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

h2 {
  margin-top: 0;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

li img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}

li span {
  flex-grow: 1;
  font-weight: 500;
}

li button {
  background-color: #007acc;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

li button:hover {
  background-color: #005fa3;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
