import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import { usePostsStore } from '@/stores/posts'
import type { PostsStore } from '@/stores/posts'
import ActionItem from '@/components/ActionItem.vue'
import { createTestingPinia } from '@pinia/testing'
import { samplePostMovementRecord } from '@/__mocks__/posts'

describe('History Item', () => {
  let wrapper: VueWrapper<any>
  let store: PostsStore

  beforeEach(() => {
    wrapper = shallowMount(ActionItem, {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ],
      propsData: {
        action: samplePostMovementRecord[0],
        index: 0
      }
    })
    store = usePostsStore()
  })

  it('Should call timeTravel', async () => {
    const mSpy = vi.spyOn(store, 'timeTravel')
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(mSpy).toHaveBeenCalledWith(0)
  })
})
