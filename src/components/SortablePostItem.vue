<template>
  <li class="post-item">
    <p class="post-item-title">Post {{ props.post.id }}</p>
    <span class="post-item-icons" :class="{ 'self-stretch': !position }">
      <button
        v-if="!(position === 'FIRST')"
        :aria-label="`Move post ${props.post.id} up`"
        :title="`Move post ${props.post.id} up`"
        class="post-item-button"
        @click.prevent="movePost(props.post.id, 'UP')"
      >
        <i class="fa-solid fa-chevron-up fa-sm"></i>
      </button>
      <button
        v-if="!(position === 'LAST')"
        :aria-label="`Move post ${props.post.id} down`"
        :title="`Move post ${props.post.id} down`"
        class="post-item-button"
        @click.prevent="movePost(props.post.id, 'DOWN')"
      >
        <i class="fa-solid fa-chevron-down fa-sm"></i>
      </button>
    </span>
  </li>
</template>

<script setup lang="ts">
interface SortablePostItemProps {
  post: {
    id: number
  }
  position?: 'FIRST' | 'LAST'
}

const props = defineProps<SortablePostItemProps>()

const movePost = (postId: number, direction: 'UP' | 'DOWN') => {
  // Mocking the movePost function for now
  console.log(`Mocked movePost: Move post ${postId} ${direction}`)
}
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
  // @apply -my-2 p-2 leading-none text-lavender-500;
  // @apply hover:bg-lavender-200;
  @apply my-2 p-2 leading-none;

  transition: all 0.1s ease;
  border-radius: var(--default-border-radius);
}

.post-item-icons {
  @apply flex flex-col justify-between;
}

.post-item-title {
  @apply text-xl;
}
</style>
