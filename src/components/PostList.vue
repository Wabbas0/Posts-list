<template>
  <section class="post-list-container">
    <h2 class="post-list-title">Sortable Post List</h2>

    <TransitionGroup tag="ul" name="post-list" v-if="store.posts.length">
      <SortablePostItem
        v-for="(post, index) in store.posts"
        :post="post"
        :key="post.id"
        :position="getEdgePosition(index, postListLength)"
      />
    </TransitionGroup>

    <div class="post-list-empty" v-else>
      <p>No posts found</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import SortablePostItem from './SortablePostItem.vue'
import { usePostsStore } from '@/stores/posts'
import { getEdgePosition } from '@/utils/arrayUtils'
import { computed, onMounted } from 'vue'
import { fetchPosts } from '@/services/ApiService'

const store = usePostsStore()
const postListLength = computed(() => store.posts.length)

onMounted(async () => {
  try {
    const res = await fetchPosts()
    const firstFivePosts = res.slice(0, 5)
    store.addPosts(firstFivePosts)
  } catch (error) {
    console.log(error)
  }
})
</script>

<style scoped lang="scss">
.post-list-container {
  @apply flex flex-col gap-6;
}

.post-list-title {
  @apply text-white font-semibold text-3xl;
}

.post-list {
  @apply flex;
  flex-direction: column;
  gap: 28px;
  list-style: none;
  padding-inline-start: 0;
}

.post-list-empty {
  @apply p-4 bg-white flex justify-between;
}
</style>
