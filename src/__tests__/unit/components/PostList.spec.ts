import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import { usePostsStore } from '@/stores/posts'
import type { PostsStore } from '@/stores/posts'
import PostList from '@/components/PostList.vue'
import SortablePostItem from '@/components/SortablePostItem.vue'
import { createTestingPinia } from '@pinia/testing'
import { samplePosts } from '@/__mocks__/posts'

describe('Post List', () => {
  let wrapper: VueWrapper<any>
  let store: PostsStore

  beforeEach(() => {
    wrapper = shallowMount(PostList, {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    })
    store = usePostsStore()
    store.posts = [...samplePosts]
  })

  it('Should render the correct number of posts', () => {
    const postItems = wrapper.findAllComponents(SortablePostItem)
    console.log(postItems)
    expect(postItems.length).toBe(store.posts.length)
  })

  it('Should show the empty message when there are no posts', async () => {
    store.posts = []
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.post-list-empty').exists()).toBe(true)
  })

  it('Should not show the empty message when there are posts', async () => {
    store.posts = [...samplePosts]
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.post-list-empty').exists()).toBe(false)
  })
})
