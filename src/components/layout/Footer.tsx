"use client";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaFacebookSquare } from "react-icons/fa";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import Button from "../utilities/Button";
import useCourses from "../../hooks/api/useCourses";
import api from "../../lib/api";
import { BlogModel } from "../../types";


interface NewsletterProps {
  isMobile: boolean;
}

const fetchBlogs = async (): Promise<BlogModel[]> => {
  const response = await api.get("/api/blogs");
  return response.data.data;
};

const Newsletter = ({ isMobile }: NewsletterProps) => {
  return (
    <div
      className={`${
        isMobile ? "flex lg:hidden " : "hidden lg:flex"
      } flex-col gap-2`}
    >
      <span className="w-full lg:w-[432px] inline-flex text-[16px] lg:text-[20px] text-[#F2F4F7] font-light leading-7">
        Get the best resources to build your portfolio delivered to your mailbox
      </span>
      <input
        type="email"
        name="email"
        placeholder="Email address"
        className="w-full lg:w-[432px] rounded-[8px] p-3 text-[14px] placeholder:font-light text-primary placeholder:text-[#98A2B3]
                outline-none"
      />
      <Button text="Subscribe" classNames="w-fit lg:w-[172px] bg-primary" />
    </div>
  );
};

const Footer = () => {
  const { courses} = useCourses();
  

  const {
    data: blogs,
    isLoading: blogsLoading,
    error: blogsError,
  } = useQuery<BlogModel[], Error>({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

 
  const recentPosts = React.useMemo(() => {
    if (!blogs) return [];
    
    return blogs
      .sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);
  }, [blogs]);

  return (
    <footer className="bg-[#0B0D0F] text-white border-t-[8px] border-primary">
      <div className="w-11/12 mx-auto py-[50px]">

        <div className="mb-8">
          <h3 className="text-[20px] text-[#F2F4F7] font-bold mb-6">Recent Posts</h3>
          <div className="flex flex-col gap-4">
            {blogsLoading ? (
              <div className="text-center py-6 text-[#D0D5DD]">Loading recent posts...</div>
            ) : blogsError ? (
              <div className="text-center py-6 text-[#F97316]">
                Error loading posts
              </div>
            ) : recentPosts.length === 0 ? (
              <div className="text-center py-6 text-[#D0D5DD]">No recent posts available</div>
            ) : (
              recentPosts.map((post) => (
                <Link
                  href={`/blog/${post.id}`}
                  key={post.id}
                  className="group block hover:bg-[#FFFFFF0A] p-3 rounded-lg transition-all duration-300 border border-transparent hover:border-[#FFFFFF1A]"
                >
                  <div className="flex gap-3 items-start">
                    <img
                      src={post.images[0]?.url || "/img/blog-placeholder.png"}
                      alt={post.title}
                      className="w-[80px] h-[60px] object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex flex-col gap-2 flex-grow min-w-0">
                      <h4 className="text-[#F2F4F7] text-[14px] font-medium leading-5 group-hover:text-white transition-colors line-clamp-2">
                        {post.title.substring(0, 60)}
                        {post.title.length > 60 ? "..." : ""}
                      </h4>
                      <div className="flex items-center gap-2">
                        <svg 
                          className="w-3 h-3 text-[#98A2B3] flex-shrink-0" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[#98A2B3] text-[12px] font-light">
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
              ))
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 lg:flex flex-wrap justify-between lg:gap-5 gap-y-8 py-[35px]">
          <div>
            <h3 className="text-[20px] text-[#F2F4F7] font-bold mb-3">
              Course Catalog
            </h3>
            <ul className="text-[#D0D5DD] flex flex-col gap-2">
              {courses?.map((course, i) => {
                return (
                  <li key={course.id}>
                    <Link href={`/courses/${course.id}`}> {course.title} </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] text-[#F2F4F7] font-bold mb-3">
              Resources
            </h3>
            <ul className="text-[#D0D5DD] flex flex-col gap-2">
              <li>
                <Link href="/blog">Blog Articles</Link>
              </li>
              <li>
                <Link href="">Tech Guides</Link>
              </li>
              <li>
                <Link href="">Case Studies</Link>
              </li>
              <li>
                <Link href="">Tech Series</Link>
              </li>
              <li>
                <Link href="">Podcast</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] text-[#F2F4F7] font-bold mb-3">
              Events
            </h3>
            <ul className="text-[#D0D5DD] flex flex-col gap-2">
              <li>
                <Link href="">DataCon</Link>
              </li>
              <li>
                <Link href="">AI Con</Link>
              </li>
              <li>
                <Link href="/masterclass">Masterclass</Link>
              </li>
              <li>
                <Link href="">Tech Series</Link>
              </li>
              <li>
                <Link href="">Tech Series</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[20px] text-[#F2F4F7] font-bold mb-3">
              Contact us
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="bg-[#FFFFFF1A] flex justify-center items-center rounded-full h-[45px] w-[45px]">
                <Link href="https://x.com/nebiantanalytic">
                  <FaSquareXTwitter size={20} />
                </Link>
              </div>
              <div className="bg-[#FFFFFF1A] flex justify-center items-center rounded-full h-[45px] w-[45px]">
                <Link href="https://www.facebook.com/share/18mFvjJE1z/">
                  <FaFacebookSquare size={20} />
                </Link>
              </div>
              <div className="bg-[#FFFFFF1A] flex justify-center items-center rounded-full h-[45px] w-[45px]">
                <Link href="https://www.instagram.com/nebiantanalytics">
                  <FaSquareInstagram size={20} />
                </Link>
              </div>
              <div className="bg-[#FFFFFF1A] flex justify-center items-center rounded-full h-[45px] w-[45px]">
                <Link href="https://www.linkedin.com/company/nebiant-analytics/">
                  <FaLinkedin size={20} />
                </Link>
              </div>
            </div>
            <Newsletter isMobile={false} />
          </div>
        </div>
        <Newsletter isMobile={true} />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <img src="svg/logo2.svg" alt="" className="hidden lg:inline-block" />

          <div className="flex items-center gap-10 mt-4 lg:mt-0">
            <Link
              href="https://wa.me/2347042351981"
              className="hidden lg:inline-flex"
            >
              Developer
            </Link>
            <Link href="">Terms & Condition</Link>
            <Link href="">Policy Policy</Link>
            <img
              src="svg/nigerian-flag.svg"
              alt=""
              className="hidden lg:inline-flex"
            />
          </div>
        </div>
        <Link href="" className="lg:hidden inline-flex my-2">
          Developer
        </Link>
        <img src="svg/logo2.svg" alt="" className="lg:hidden block" />
      </div>
    </footer>
  );
};

export default Footer;