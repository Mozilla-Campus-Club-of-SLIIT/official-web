import { notFound } from "next/navigation"
import Image from "next/image"
import { blogPosts } from "@/lib/blog-data"

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }))
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="relative h-[400px] w-full mb-8">
          <Image src={post.imageUrl} alt={post.title} fill className="object-cover rounded-lg" />
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>{post.author}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>

        <div className="prose max-w-none">{post.content}</div>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
