<template>
  <li class="action-item">
    <p>
      Moved post {{ props.action.postId }} from index {{ props.action.prevIndex }} to index
      {{ props.action.currIndex }}
    </p>
    <button class="action-item-button" @click.prevent="store.timeTravel(props.index)">
      Time travel
    </button>
  </li>
</template>

<script setup lang="ts">
import { usePostsStore } from '../stores/posts.js'
import type { PostMovementRecord } from '../stores/posts.js'

const store = usePostsStore()

interface ActionItemProps {
  action: PostMovementRecord
  index: number
}

const props = defineProps<ActionItemProps>()
</script>

<style scoped lang="scss">
.action-item {
  @apply flex justify-between p-3 gap-4 items-center;
}

.action-item-button {
  @apply py-3 px-6;
  background-color: #25ff90;
  border: none;
  border-radius: calc(var(--default-border-radius) * 1.5);
  font-weight: 600;

  &:hover {
    background: #21e682;
  }
}
</style>
