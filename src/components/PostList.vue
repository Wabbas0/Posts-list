<template>
  <section class="post-list-container">
    <h2 class="post-list-title">Sortable Post List</h2>

    <div class="flex items-center justify-center h-screen" v-if="isLoading">
      <i class="fas fa-spinner fa-spin"></i>
    </div>

    <TransitionGroup class="post-list" tag="ul" name="list" v-else-if="store.posts.length">
      <SortablePostItem
        v-for="(post, index) in store.posts"
        :post="post"
        :key="post.id"
        :position="getEdgePosition(index, postListLength)"
      />
    </TransitionGroup>

    <div class="post-list-empty custom-card" v-else>
      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
      <p v-else>No posts found</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import SortablePostItem from './SortablePostItem.vue'
import { usePostsStore } from '@/stores/posts'
import { getEdgePosition } from '@/utils/arrayUtils'
import { computed, onMounted, ref } from 'vue'
import { fetchPosts } from '@/services/ApiService'

const store = usePostsStore()
const postListLength = computed(() => store.posts.length)
const errorMessage = ref('')
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    const res = await fetchPosts()
    const firstFivePosts = res.slice(0, 5)
    store.addPosts(firstFivePosts)
  } catch (error) {
    errorMessage.value = 'An error occurred while fetching posts'
    console.log(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped lang="scss">
.post-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
  list-style: none;
  padding-inline-start: 0;
}

.post-list-container {
  @apply flex flex-col gap-6;
}

.post-list-title {
  @apply text-white font-semibold text-3xl;
}

.post-list-empty {
  @apply p-4 bg-white flex justify-between;
}
</style>
