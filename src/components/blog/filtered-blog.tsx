"use client"

import { ChangeEvent, useState } from "react"
import { Blog } from "content-collections"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BlogCard from "@/components/blog-card"

interface FilteredBlogProps {
  blogs: Blog[]
}

export default function FilteredBlog({ blogs }: FilteredBlogProps) {
  const [searchValue, setSearchValue] = useState("")

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <div className="relative my-8">
        <Input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search blogs"
          aria-label="Search blogs"
          className="w-full pl-12"
          id="search"
        />

        <Label htmlFor="search">
          <SearchIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        </Label>
      </div>

      {filteredBlogs.length ? (
        <div className="grid gap-10 lg:grid-cols-2">
          {filteredBlogs.map((blog, index) => (
            <BlogCard key={blog.slug} blog={blog} index={index} />
          ))}
        </div>
      ) : (
        <div className="my-24 text-center text-lg">No blogs found</div>
      )}
    </>
  )
}
