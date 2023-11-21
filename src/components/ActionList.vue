<template>
  <section class="action-list-container custom-card">
    <div class="bg-white p-6">
      <h2 class="text-2xl">List of actions committed</h2>
    </div>

    <div class="p-6 bg-neutral-100 text-lg">
      <TransitionGroup
        class="bg-white divide-y custom-card"
        tag="ul"
        name="fade"
        v-if="store.postMovementHistory.length"
      >
        <ActionItem
          v-for="(record, index) in store.postMovementHistory"
          :index="index"
          :action="record"
          :key="record.postId"
        />
      </TransitionGroup>
      <p v-else class="bg-white p-3 flex items-center custom-card">No actions commited.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import ActionItem from './ActionItem.vue'
import { usePostsStore } from '@/stores/posts'

const store = usePostsStore()
</script>

<style scoped lang="scss">
.action-list-container {
  @apply flex flex-col;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
