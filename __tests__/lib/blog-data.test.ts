import { blogPosts } from "@/lib/blog-data"

describe("Blog Post Data", () => {
  it("has valid blog post structure", () => {
    expect(blogPosts).toBeDefined()
    expect(Array.isArray(blogPosts)).toBe(true)
    expect(blogPosts.length).toBeGreaterThan(0)
  })

  it("each blog post has required fields", () => {
    blogPosts.forEach((post) => {
      expect(post.id).toBeDefined()
      expect(post.title).toBeDefined()
      expect(post.excerpt).toBeDefined()
      expect(post.content).toBeDefined()
      expect(post.author).toBeDefined()
      expect(post.date).toBeDefined()
      expect(post.imageUrl).toBeDefined()
      expect(Array.isArray(post.tags)).toBe(true)
    })
  })

  it("finds blog posts by ID correctly", () => {
    const firstPost = blogPosts.find((post) => post.id === "1")
    expect(firstPost).toBeDefined()
    expect(firstPost?.id).toBe("1")
  })

  it("returns undefined for non-existent blog post ID", () => {
    const nonExistentPost = blogPosts.find((post) => post.id === "non-existent")
    expect(nonExistentPost).toBeUndefined()
  })

  it("has valid date formats", () => {
    blogPosts.forEach((post) => {
      const date = new Date(post.date)
      expect(date).toBeInstanceOf(Date)
      expect(isNaN(date.getTime())).toBe(false)
    })
  })

  it("has valid image URLs or paths", () => {
    blogPosts.forEach((post) => {
      // Can be either absolute URL or relative path
      const isValidUrl = /^https?:\/\//.test(post.imageUrl) || /^\//.test(post.imageUrl)
      expect(isValidUrl).toBe(true)
    })
  })

  it("has non-empty content", () => {
    blogPosts.forEach((post) => {
      expect(post.title.length).toBeGreaterThan(0)
      expect(post.excerpt.length).toBeGreaterThan(0)
      expect(post.content.length).toBeGreaterThan(0)
      expect(post.author.length).toBeGreaterThan(0)
    })
  })
})

describe("Blog Post Async Params (Next.js 15)", () => {
  it("handles async params pattern correctly", async () => {
    // Test the async params pattern required by Next.js 15
    const mockAsyncParams = Promise.resolve({ id: "1" })

    const resolvedParams = await mockAsyncParams
    expect(resolvedParams.id).toBe("1")
  })

  it("finds blog post with async params", async () => {
    const mockAsyncParams = Promise.resolve({ id: "1" })

    const { id } = await mockAsyncParams
    const post = blogPosts.find((p) => p.id === id)

    expect(post).toBeDefined()
    expect(post?.id).toBe("1")
  })

  it("handles invalid async params", async () => {
    const mockAsyncParams = Promise.resolve({ id: "invalid-id" })

    const { id } = await mockAsyncParams
    const post = blogPosts.find((p) => p.id === id)

    expect(post).toBeUndefined()
  })
})
