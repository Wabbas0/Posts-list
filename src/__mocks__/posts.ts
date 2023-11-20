import type { PostMovementRecord } from '@/stores/posts.ts'
import type { Post } from '@/types/post'

export const samplePosts: Post[] = [
  {
    userId: 1,
    id: 1,
    title: 'Exploring the wonders of nature',
    body: 'Discovering hidden gems in the heart of the forest, where the melody of birds and rustling leaves create a symphony of tranquility.'
  },
  {
    userId: 1,
    id: 2,
    title: 'Unveiling the mysteries of the universe',
    body: 'Embarking on a cosmic journey to unravel the secrets of distant galaxies and witness the dance of celestial bodies in the vast expanse of space.'
  },
  {
    userId: 1,
    id: 3,
    title: 'Culinary adventures around the world',
    body: 'Savoring unique flavors and aromas, traveling from bustling street markets to Michelin-starred restaurants, exploring the diversity of global cuisines.'
  },
  {
    userId: 1,
    id: 4,
    title: 'Embracing the art of storytelling',
    body: 'Immersing in the captivating narratives woven by master storytellers, from ancient myths to contemporary tales that transport the mind to different realms.'
  },
  {
    userId: 1,
    id: 5,
    title: 'Capturing moments through the lens',
    body: 'Freezing time in a frame, documenting the beauty of everyday life, and finding art in the mundane, one click at a time.'
  }
]

export const sampleSinglePost: Post = {
  userId: 1,
  id: 1,
  title: 'Exploring the wonders of nature',
  body: 'Discovering hidden gems in the heart of the forest, where the melody of birds and rustling leaves create a symphony of tranquility.'
}

export const samplePostMovementRecord: PostMovementRecord[] = [
  {
    postId: 1,
    prevIndex: 0,
    currIndex: 1,
    postOrder: [1, 2, 3, 4, 5]
  },
  {
    postId: 3,
    prevIndex: 2,
    currIndex: 1,
    postOrder: [2, 1, 3, 4, 5]
  },
  {
    postId: 4,
    prevIndex: 3,
    currIndex: 4,
    postOrder: [4, 3, 1, 2, 5]
  }
]
