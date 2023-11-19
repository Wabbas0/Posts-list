import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Post } from '@/types/Post'
import { swapArrayElements } from '@/utils/arrayUtils'

type Direction = 'UP' | 'DOWN'

type PostOrder = Post['id'][]

export interface PostMovementRecord {
  postId: number
  postOrder: PostOrder
  prevIndex: number
  currIndex: number
}

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const postMovementHistory = ref<PostMovementRecord[]>([])

  const postOrder = computed<PostOrder>(() => posts.value.map((post) => post.id))

  function addPosts(data: Post | Post[]) {
    if (Array.isArray(data)) {
      data.forEach((post) => {
        posts.value.push(post)
      })
    } else {
      posts.value.push(data)
    }
  }

  function isValidPostId(id: number): id is Post['id'] {
    return posts.value.some((post) => post.id === id)
  }

  function movePost(postId: number, direction: Direction) {
    const postIndex = postOrder.value.indexOf(postId)

    if (postIndex === -1) {
      throw new Error(`Post with ID ${postId} does not exist`)
    }

    let newPostIndex: number = -1

    if (direction === 'UP') {
      newPostIndex = postIndex - 1
    }

    if (direction === 'DOWN') {
      newPostIndex = postIndex + 1
    }

    if (newPostIndex !== -1 && newPostIndex < posts.value.length) {
      const prevPostOrder: PostOrder = [...postOrder.value]
      posts.value = swapArrayElements(posts.value, postIndex, newPostIndex)

      addPostMovementRecord({
        postId,
        prevIndex: postIndex,
        currIndex: newPostIndex,
        postOrder: prevPostOrder
      })
    }
  }

  function addPostMovementRecord(record: PostMovementRecord) {
    postMovementHistory.value.push(record)
  }

  function sortPosts(order: PostOrder) {
    const checkedOrder = order.filter((id) => isValidPostId(id))
    const orderedPosts = checkedOrder.map(
      (id) => posts.value.find((post) => post.id === id) as Post
    )

    posts.value = orderedPosts
  }

  function timeTravel(index: number) {
    if (index < 0 || index > postMovementHistory.value.length - 1) {
      return
    }

    sortPosts(postMovementHistory.value[index].postOrder)
    postMovementHistory.value = postMovementHistory.value.slice(0, index)
  }

  return {
    posts,
    postMovementHistory,
    postOrder,
    addPosts,
    movePost,
    timeTravel
  }
})

export type PostsStore = ReturnType<typeof usePostsStore>
