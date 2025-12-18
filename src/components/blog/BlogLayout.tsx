import { IoSearch } from "react-icons/io5";
import TagLabel from "../utilities/TagLabel";
import Card from "../blog/Card";
import { BlogModel } from "../../types";
import Link from "next/link";

interface BlogLayoutProps {
  children: React.ReactNode;
  blogs?: BlogModel[];
  currentPostId?: string;
}

export default function BlogLayout({
  children,
  blogs = [],
  currentPostId,
}: BlogLayoutProps) {
  // Getting the 3 most recent posts (excluding current post if provided)
  const recentPosts = blogs
    .filter(blog => blog.id !== currentPostId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-5 mt-[60px]">
      <div className="lg:flex-[0.6]">{children}</div>
      <div className="lg:flex-[0.4] flex flex-col gap-8 mb-10 lg:mb-0">
        <Card heading="Search">
          <div className="bg-white flex gap-3 items-center border-2 border-[#0000001A] px-3 h-[56px] rounded-full">
            <IoSearch className="text-[#6D6D6D]" />
            <input
              type="text"
              className="w-full h-full outline-none rounded-full bg-transparent"
              placeholder="Search..."
            />
          </div>
        </Card>
        
        <Card heading="Categories">
          <div className="flex flex-col gap-3">
            <div className="bg-white flex gap-3 items-center justify-between text-[12px] text-[#6D6D6D] font-bold border-2 border-[#0000001A] px-6 h-[56px] rounded-full">
              <span className="text-[#6D6D6D]">Business</span>
              <span>(1)</span>
            </div>
            <div className="bg-white flex gap-3 items-center justify-between text-[12px] text-[#6D6D6D] font-bold border-2 border-[#0000001A] px-6 h-[56px] rounded-full">
              <span className="text-[#6D6D6D]">Technology</span>
              <span>(3)</span>
            </div>
            <div className="bg-white flex gap-3 items-center justify-between text-[12px] text-[#6D6D6D] font-bold border-2 border-[#0000001A] px-6 h-[56px] rounded-full">
              <span className="text-[#6D6D6D]">Data Science</span>
              <span>(5)</span>
            </div>
            <div className="bg-white flex gap-3 items-center justify-between text-[12px] text-[#6D6D6D] font-bold border-2 border-[#0000001A] px-6 h-[56px] rounded-full">
              <span className="text-[#6D6D6D]">Analytics</span>
              <span>(2)</span>
            </div>
          </div>
        </Card>

        <Card heading="Recent Posts">
          <div className="flex flex-col gap-4">
            {recentPosts.map((post) => (
              <Link 
                href={`/blog/${post.id}`} 
                key={post.id}
                className="hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <div className="flex gap-2 items-center">
                  <img
                    src={post.images[0]?.url || "/img/blog-placeholder.png"}
                    alt={post.title}
                    className="w-[88px] h-[60px] object-cover rounded-[5px]"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[#6D6D6D] text-[14px] font-bold">
                      {post.title.substring(0, 40)}
                      {post.title.length > 40 ? "..." : ""}
                    </h3>
                    <div className="flex items-center gap-2">
                      <img src="/svg/calendar5.svg" alt="Calendar" />
                      <span className="text-[12px] font-light">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card heading="TAGS">
          <div className="flex gap-1 flex-wrap">
            <TagLabel text="Data Analytics" bgColor="#FFFFFF" />
            <TagLabel text="Data" bgColor="#FFFFFF" />
            <TagLabel text="Statistics" bgColor="#FFFFFF" />
            <TagLabel text="Data Cleaning" bgColor="#FFFFFF" />
            <TagLabel text="Data Modeling" bgColor="#FFFFFF" />
            <TagLabel text="Big Data" bgColor="#FFFFFF" />
            <TagLabel text="Data Governance" bgColor="#FFFFFF" />
            <TagLabel text="Data Ethics" bgColor="#FFFFFF" />
            <TagLabel text="Data Insights" bgColor="#FFFFFF" />
          </div>
        </Card>
      </div>
    </div>
  );
}