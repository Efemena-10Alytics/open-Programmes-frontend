import { BlogModel } from "../../types";
import Link from "next/link";

interface RecentPostsProps {
  posts: BlogModel[];
  currentPostId?: string;
}

const RecentPosts = ({ posts, currentPostId }: RecentPostsProps) => {
  // Filter out current post if provided and get 3 most recent
  const recentPosts = posts
    .filter(post => post.id !== currentPostId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      {recentPosts.map((post) => (
        <Link href={`/blog/${post.id}`} key={post.id} className="flex gap-2 items-center hover:bg-gray-50 p-2 rounded">
          <img
            src={post.images[0]?.url || "/img/blog-placeholder.png"}
            alt={post.title}
            className="w-[88px] h-[60px] object-cover rounded-[5px]"
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-[#6D6D6D] text-[14px] font-bold">
              {post.title.substring(0, 40)}{post.title.length > 40 ? "..." : ""}
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
        </Link>
      ))}
    </div>
  );
};

export default RecentPosts;