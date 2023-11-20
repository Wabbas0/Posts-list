import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import { usePostsStore } from '@/stores/posts'
import type { PostsStore } from '@/stores/posts'
import PostItem from '@/components/SortablePostItem.vue'
import { createTestingPinia } from '@pinia/testing'
import { samplePosts, sampleSinglePost } from '@/__mocks__/posts'

describe('Post Item', () => {
  let wrapper: VueWrapper<any>
  let store: PostsStore

  beforeEach(() => {
    wrapper = shallowMount(PostItem, {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ],
      propsData: {
        post: sampleSinglePost,
        edge: false
      }
    })
    store = usePostsStore()
    store.posts = [...samplePosts]
  })

  it('Should call move down', async () => {
    const movePostSpy = vi.spyOn(store, 'movePost')
    const downButton = wrapper.findAll('button').at(1)!
    await downButton.trigger('click')
    expect(movePostSpy).toHaveBeenCalledWith(1, 'DOWN')
  })

  it('Should call move up', async () => {
    const movePostSpy = vi.spyOn(store, 'movePost')
    const upButton = wrapper.findAll('button').at(0)!
    await upButton.trigger('click')
    expect(movePostSpy).toHaveBeenCalledWith(1, 'UP')
  })

  it('Should have only down button', async () => {
    const movePostSpy = vi.spyOn(store, 'movePost')
    await wrapper.setProps({ position: 'FIRST' })
    const downButton = wrapper.find('button')

    if (downButton.exists()) {
      await downButton.trigger('click')
      expect(movePostSpy).toHaveBeenCalledWith(1, 'DOWN')
    } else {
      expect(downButton.exists()).toBe(false)
    }
  })

  it('Should have only up button', async () => {
    const movePostSpy = vi.spyOn(store, 'movePost')
    await wrapper.setProps({ position: 'LAST' })
    const upButton = wrapper.find('button')

    if (upButton.exists()) {
      await upButton.trigger('click')
      expect(movePostSpy).toHaveBeenCalledWith(1, 'UP')
    } else {
      expect(upButton.exists()).toBe(false)
    }
  })
})
