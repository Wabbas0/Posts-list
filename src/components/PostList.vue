<template>
  <section class="post-list-container">
    <h2 class="post-list-title">Sortable Post List</h2>

    <TransitionGroup tag="ul" name="post-list" v-if="posts.length">
      <SortablePostItem v-for="post in posts" :post="post" :key="post.id" />
    </TransitionGroup>

    <div class="post-list-empty" v-else>
      <p>No posts found</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import SortablePostItem from './SortablePostItem.vue'
import { ref } from 'vue'

const posts = ref([
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
  { id: 5, title: 'Post 5' }
])
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
