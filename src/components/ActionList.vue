<template>
  <section class="action-list-container">
    <div class="flex flex-col">
      <div class="bg-white p-6">
        <h2 class="text-2xl">List of actions committed</h2>
      </div>
      <div class="p-6 bg-neutral-100 text-lg">
        <ul v-if="store.postMovementHistory.length" class="bg-white divide-y">
          <ActionItem
            v-for="(record, index) in store.postMovementHistory"
            :index="index"
            :action="record"
            :key="record.postId"
          />
        </ul>
        <p v-else class="bg-white p-3 flex items-center">No actions commited.</p>
      </div>
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
  @apply flex flex-col gap-6;
}
</style>
