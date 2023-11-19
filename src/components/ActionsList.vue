<template>
  <section class="action-list-container">
    <div class="o-card flex flex-col">
      <div class="bg-white p-6">
        <h2 class="text-2xl">List of actions committed</h2>
      </div>
      <div class="p-6 bg-neutral-100 text-lg">
        <ul v-if="actions.length" class="bg-white divide-y">
          <ActionItem
            v-for="(action, index) in actions"
            :index="index"
            :action="action"
            :key="action.postId"
          />
        </ul>
        <p v-else class="bg-white p-3 flex items-center">No actions commited.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ActionItem from './ActionItem.vue'
import { ref } from 'vue'

const actions = ref([])
</script>

<style scoped lang="scss">
.action-list-container {
  @apply flex flex-col gap-6;
}
</style>
