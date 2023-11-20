import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import { usePostsStore } from '@/stores/posts'
import type { PostsStore } from '@/stores/posts'
import ActionList from '@/components/ActionList.vue'
import ActionItem from '@/components/ActionItem.vue'
import { createTestingPinia } from '@pinia/testing'
import { samplePostMovementRecord } from '@/__mocks__/posts'

describe('Action List', () => {
  let wrapper: VueWrapper<any>
  let store: PostsStore

  beforeEach(() => {
    wrapper = shallowMount(ActionList, {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    })
    store = usePostsStore()
    store.postMovementHistory = [...samplePostMovementRecord]
  })

  it('Should render the correct number of actions', () => {
    const actionItems = wrapper.findAllComponents(ActionItem)
    expect(actionItems.length).toBe(store.postMovementHistory.length)
  })

  it('Should show the empty message when there are no actions', async () => {
    store.postMovementHistory = []
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.custom-card').text()).toContain('No actions commited.')
  })

  it('Should not show the empty message when there are actions', async () => {
    store.postMovementHistory = [...samplePostMovementRecord]
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.custom-card').text()).not.toContain('No actions commited.')
  })
})
