import { describe, expect, it } from 'vitest'
import { fetchPosts } from '@/services/ApiService.js'
import { samplePosts } from '@/__mocks__/posts'

const MOCK_POSTS = [...samplePosts]
const ERROR_MESSAGE = 'No response'

// Mock fetch function
const mockFetch = (response: any, shouldReject = false) => {
  global.fetch = () =>
    shouldReject
      ? Promise.reject(response)
      : Promise.resolve({
          json: () => Promise.resolve(response)
        })
}

describe('Data service', () => {
  it('Should throw an error', async () => {
    mockFetch(new Error(ERROR_MESSAGE), true)

    try {
      await fetchPosts()
      expect.fail('Expect an error to be thrown')
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe(ERROR_MESSAGE)
      }
    }

    // Reset the fetch mock after the test
    mockFetch(MOCK_POSTS)
  })

  it('Should fetch posts', async () => {
    const posts = await fetchPosts()
    expect(posts).toHaveLength(5)
  })
})

// Initialize the fetch mock
mockFetch(MOCK_POSTS)
