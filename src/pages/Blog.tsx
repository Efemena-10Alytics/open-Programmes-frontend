import { useQuery } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import BlogBanner from "../components/blog/BlogBanner";
import BlogItem from "../components/blog/BlogItem";
import BlogLayout from "../components/blog/BlogLayout";
import Loader from "../components/utilities/Loader";
import api from "../lib/api";
import { BlogModel } from "../types";

const Blog = () => {
  const fetchBlogs = async (): Promise<BlogModel[]> => {
    const response = await api.get("/api/blogs");
    return response.data.data;
  };

  const { data: blogs, isLoading, error } = useQuery<BlogModel[], Error>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>An error occurred: {error.message}</div>;
  

  return (
    <div className="w-11/12 mx-auto">
      <BlogBanner heading="Blog" />
      <BlogLayout blogs={blogs}>
        <div className="flex flex-col gap-10 -mt-[100px] mb-[160px]">
          {blogs?.map((blog) => (
            <BlogItem
              key={blog.id}
              images={blog.images?.length ? [blog.images[0].url] : ["/img/blog-placeholder.png"]}
              postedBy="By Admin"
              commentCounts={0}
              datePosted={new Date(blog.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              title={blog.title}
              text={blog.content.substring(0, 200) + "..."}
              footer={
                <Link
                  href={`/blog/${blog.id}`}
                  className="bg-primary w-fit flex items-center justify-center px-7 py-2 mt-7 text-white font-light rounded-full"
                >
                  Read More
                </Link>
              }
            />
          ))}
        </div>

        <div className="w-full lg:w-[682px] flex items-center justify-center gap-2 mb-6">
          <span className="bg-[#D9D9D9] h-[40px] w-[40px] flex items-center justify-center rounded-full text-[#828282] font-light cursor-pointer">
            1
          </span>
          <span className="bg-[#D9D9D9] h-[40px] w-[40px] flex items-center justify-center rounded-full text-[#828282] font-light cursor-pointer">
            2
          </span>
          <span className="bg-[#D9D9D9] h-[40px] w-[40px] flex items-center justify-center rounded-full text-[#828282] font-light cursor-pointer">
            3
          </span>

          <span className="bg-primary h-[40px] w-[40px] flex items-center justify-center rounded-full text-[#FFFFFF] font-light cursor-pointer">
            <FaArrowRight />
          </span>
        </div>
      </BlogLayout>
    </div>
  );
};

export default Blog;