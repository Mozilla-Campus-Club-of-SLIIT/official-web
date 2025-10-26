"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react"

const blogPosts = [
  {
    id: "1",
    title: "Java and it’s benefits compared to other programming languages",
    imageUrl: "/assets/blog1.png",
    excerpt:
      "The name of this programming language, JAVA is coming from Indonesian islands where there are huge coffee plantations. The similarity of both the programming language name and the coffee, is that word Java is synonymous with coffee in english language.",
    author: "Charuka Wanigasinghe",
    date: "2024-07-17",
    tags: ["Tech", "Java"],
    mediumUrl:
      "https://medium.com/@infosliitmcc/java-and-its-benefits-compared-to-other-programming-languages-e51f9b93e7ec",
  },
  {
    id: "2",
    title: "Cyberwarfare: How does it impact everyday life?",
    imageUrl: "/assets/blog3.png",
    excerpt: "Unlike traditional warfare, cyberwarfare attacks the digital realm...",
    author: "Thisak Gunasekara",
    date: "2024-07-17",
    tags: ["Cybersecurity", "Cyberwarfare"],
    mediumUrl:
      "https://medium.com/@infosliitmcc/cyberwarfare-how-does-it-impact-everyday-life-b5692a7cf6cd",
  },
  {
    id: "3",
    title: "Virtualization and Linux",
    imageUrl: "/assets/blog2.png",
    excerpt: "What is virtualization and how does it work with Linux?...",
    author: "Hinesha Perera",
    date: "2024-07-17",
    tags: ["Linux", "Virtualization", "Hyper-V"],
    mediumUrl: "https://medium.com/@infosliitmcc/virtualization-and-linux-d9da8da84407",
  },
  {
    id: "4",
    title: "Introduction to Git: Understanding the Basics",
    imageUrl: "/assets/blog4.png",
    excerpt:
      "If you are in software development, version control systems (VCS) is must have tools to manage source code. They allow several developers to collaborate on a project, track changes and keep all of those long-term history into your application.",
    author: "Romeshika Dewmini",
    date: "2024-07-17",
    tags: ["Git", "Version Controlling", "GitHub"],
    mediumUrl:
      "https://medium.com/@infosliitmcc/introduction-to-git-understanding-the-basics-0ee3955c87e1",
  },
  {
    id: "5",
    title: "Cloud Security: Best Practices for Protecting Your Data",
    imageUrl: "/assets/blog5.png",
    excerpt:
      "As more organisations move to the cloud, protecting sensitive data has become a top priority. Cloud environments present new security challenges in addition to many benefits like scalability, cost efficiency, and accessibility.",
    author: "Leena Jilain",
    date: "2024-07-17",
    tags: ["Cloud", "Security", "Cloud Security"],
    mediumUrl:
      "https://medium.com/@infosliitmcc/cloud-security-best-practices-for-protecting-your-data-11f0ad7bea3c",
  },
  {
    id: "6",
    title: "Understanding the prevailing AI applications",
    imageUrl: "/assets/blog6.png",
    excerpt:
      "While there is a prevailing doubt about the rise and development of AI affecting the jobs of humans there are numerous examples that shows that shows AI is shaping the future better.",
    author: "Lakshi Senadheera",
    date: "2024-07-17",
    tags: ["AI", "Artificial Intelligence", "AI Applications"],
    mediumUrl:
      "https://medium.com/@infosliitmcc/understanding-the-prevailing-ai-applications-1c50b25d0c61",
  },
  {
    id: "7",
    title: "Top 5 Cyber Threats Every University Student Should Know",
    imageUrl: "/assets/blog7.png",
    excerpt:
      "As a university student, you're constantly connected to the internet for research, assignments, social media, and entertainment. While the digital world offers incredible opportunities, it also exposes you to various cyber threats that can compromise your personal information, academic work, and financial security.",
    author: "Heshan Kariyawasam",
    date: "2025-08-28",
    tags: ["Cybersecurity", "Cyber Threats"],
    mediumUrl:
      "https://medium.com/@infosliitmcc/top-5-cyber-threats-every-university-student-should-know-ccd74a9773ac",
  },
  {
    id: "8",
    title: "A Beginner’s Guide to Mastering APIs with Postman and HTTPie",
    imageUrl: "/assets/blog8.png",
    excerpt:
      "APIs power most of the apps we use every day, from logging in with Google to checking the weather or ordering food online. But for beginners, APIs can feel like a mysterious black box.",
    author: "Janitha Gamage",
    date: "2025-10-01",
    tags: ["API", "HTTPie", "Postman"],
    mediumUrl:
      "https://medium.com/@infosliitmcc/a-beginners-guide-to-mastering-apis-with-postman-and-httpie-6ba30d109491",
  },
]

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // 1. Filter posts based on search term (title, excerpt, author, or tags)
  const filteredPosts = blogPosts.filter((post) => {
    const lower = searchTerm.toLowerCase()
    return (
      post.title.toLowerCase().includes(lower) ||
      post.excerpt.toLowerCase().includes(lower) ||
      post.author.toLowerCase().includes(lower) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lower))
    )
  })

  // 2. Pagination logic on filtered posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Reset pagination if search term changes (useEffect not strictly necessary for simple reset)
  // Optionally reset page to 1 when search changes
  // useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Editor&apos;s Corner</h1>

        {/* --- Search Bar --- */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 transition"
            placeholder="Search by title, author, tag, or keyword..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1) // Reset to first page on search change
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 my-8">No blog posts found.</p>
          ) : (
            currentPosts.map((post) => (
              <a key={post.id} href={post.mediumUrl} target="_blank" rel="noopener noreferrer">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-orange-600">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="https://medium.com/@infosliitmcc"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block font-medium text-primary group no-underline 
                after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:bg-current 
                after:w-0 after:transition-[width] after:duration-300 hover:after:w-full"
          >
            View More Blogs
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
