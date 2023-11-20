<template>
  <li class="post-item custom-card">
    <p class="post-item-title">Post {{ props.post.id }}</p>
    <span class="post-item-icons" :class="{ 'self-stretch': !position }">
      <button
        v-if="!(position === 'FIRST')"
        :aria-label="`Move post ${props.post.id} up`"
        :title="`Move post ${props.post.id} up`"
        class="post-item-button"
        @click.prevent="store.movePost(props.post.id, 'UP')"
      >
        <i class="fa-solid fa-chevron-up fa-sm"></i>
      </button>
      <button
        v-if="!(position === 'LAST')"
        :aria-label="`Move post ${props.post.id} down`"
        :title="`Move post ${props.post.id} down`"
        class="post-item-button"
        @click.prevent="store.movePost(props.post.id, 'DOWN')"
      >
        <i class="fa-solid fa-chevron-down fa-sm"></i>
      </button>
    </span>
  </li>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'

interface SortablePostItemProps {
  post: {
    id: number
  }
  position?: 'FIRST' | 'LAST' | ''
}

const props = defineProps<SortablePostItemProps>()
const store = usePostsStore()
</script>

<style scoped lang="scss">
.post-item {
  @apply p-3 bg-white flex items-center justify-between min-h-[6.2rem];
  border: 1px solid #e9e9e9;
  border-radius: var(--default-border-radius);
  box-shadow: var(--default-box-shadow);
  overflow: hidden;
}

.post-item-button {
  @apply my-2 p-2 leading-none;
  transition: all 0.1s ease;
  border-radius: var(--default-border-radius);
  &:hover {
    background-color: #ebe9f7;
  }
}

.post-item-icons {
  @apply flex flex-col justify-between;
}

.post-item-title {
  @apply text-xl;
}
</style>
