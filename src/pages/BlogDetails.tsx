"use client"; // Add this because we're using hooks

import { Form, Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import BlogBanner from "../components/blog/BlogBanner";
import BlogItem from "../components/blog/BlogItem";
import BlogLayout from "../components/blog/BlogLayout";
import TagLabel from "../components/utilities/TagLabel";
import TextInput from "../components/utilities/TextInput";
import Card from "../components/blog/Card";
import Loader from "../components/utilities/Loader";
import api from "../lib/api";
import { BlogModel } from "../types";
import { Key, useEffect, useState } from "react";

const BlogDetails = () => {
  const params = useParams();
  const blogId = params?.blogId as string;
  
  const [currentUrl, setCurrentUrl] = useState<string>("");
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const containerClassNames =
    "bg-[#FFFFFF] flex gap-2 items-center border-2 border-[#0000001A] rounded-full w-full px-5";
  const inputClassNames =
    "bg-[#FFFFFF] flex py-3 w-full text-[#828282] text-[14px] rounded-[10px] placeholder:text-[#828282] placeholder:text-[13px] focusl:outline-green-200 outline-0";

  const fetchBlog = async (): Promise<BlogModel> => {
    const response = await api.get(`/api/blogs/${blogId}`);
    return response.data.data;
  };

  const fetchAllBlogs = async (): Promise<BlogModel[]> => {
    const response = await api.get("/api/blogs");
    return response.data.data;
  };

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery<BlogModel, Error>({
    queryKey: ["blog", blogId],
    queryFn: fetchBlog,
    enabled: !!blogId,
  });

  const { data: blogs } = useQuery<BlogModel[], Error>({
    queryKey: ["blogs"],
    queryFn: fetchAllBlogs,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!blog) return <div>No blog found</div>;

  const blogImages =
    blog.images?.map((img) => img.url).filter((url) => url) || [];

  return (
    <div className="w-11/12 mx-auto">
      <BlogBanner heading={blog.title} />
      <BlogLayout blogs={blogs} currentPostId={blogId}>
        <div className="flex flex-col gap-10 -mt-[100px] mb-[160px]">
          <BlogItem
            images={blogImages}
            postedBy="By Nebiant Analytics"
            commentCounts={0}
            datePosted={new Date(blog.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            title={blog.title}
            text={blog.content}
            footer={
              <div className="flex flex-col gap-8">
                {/* Tags Section */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[18px] font-bold text-[#333333]">
                    Tags:
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {blog.tags?.map(
                      (
                        tag: { content: string },
                        index: Key | null | undefined
                      ) => (
                        <TagLabel
                          key={index}
                          text={tag.content}
                          bgColor="#F9FAFB"
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Share Section */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[18px] font-bold text-[#333333]">
                    Share this post:
                  </h4>
                  <div className="flex gap-4">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FFCAC9] text-[#CA2421] flex justify-center items-center rounded-full h-[45px] w-[45px] hover:bg-[#CA2421] hover:text-white transition-colors"
                    >
                      <FaSquareXTwitter size={20} />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FFCAC9] text-[#CA2421] flex justify-center items-center rounded-full h-[45px] w-[45px] hover:bg-[#CA2421] hover:text-white transition-colors"
                    >
                      <FaFacebookSquare size={20} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FFCAC9] text-[#CA2421] flex justify-center items-center rounded-full h-[45px] w-[45px] hover:bg-[#CA2421] hover:text-white transition-colors"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>

                {/* Author Bio Section */}
                <div className="flex flex-col gap-4 p-6 bg-[#F9FAFB] rounded-lg">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/img/mixedLogo.png"
                      alt="Nebiant Analytics"
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-[18px] font-bold">
                        Nebiant Analytics
                      </h5>
                      <p className="text-[#555555] text-sm">
                        Data Science Education Provider
                      </p>
                    </div>
                  </div>
                  <p className="text-[#555555]">
                    Nebiant Analytics is a leading provider of data science
                    education, offering comprehensive courses and resources for
                    aspiring data professionals.
                  </p>
                </div>
              </div>
            }
          />
        </div>

        <div className="flex flex-col gap-7">
          <Card heading="Comments (03)">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-[#DBDBDB] pb-5 pt-7">
                <h3 className="flex justify-center items-center bg-[#D9D9D9] min-h-[100px] min-w-[100px] h-[100px] w-[100px] rounded-full text-[24px] text-[#333333] font-bold">
                  JD
                </h3>
                <div className="flex flex-col gap-1 text-[#333333]">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/svg/calendar5.svg"
                      alt="calendar"
                      width={20}
                      height={20}
                    />
                    <span className="text-[12px] font-light">27 June 2024</span>
                  </div>
                  <span className="text-[#6D6D6D] text-[14px] font-bold">
                    Jane Doe
                  </span>
                  <span className="text-[13px] font-light">
                    Collaboratively empower multifunctional e-commerce for
                    prospective applications. Seamlessly productivate plug and
                    play markets.
                  </span>
                  <div className="bg-[#D9D9D9] flex items-center p-1 gap-1 w-fit rounded-[4px]">
                    <TiArrowBack />
                    <span className="text-[12px] font-light">Reply</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card heading="Leave Comment">
            <div className="pl-3">
              <span className="flex mb-3 text-[14px] text-[#333333] font-light">
                Your email address will not be published. Required fields are
                marked
              </span>

              <Formik
                initialValues={{ name: "", email: "", message: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-3">
                    <div className="flex justify-between gap-4 mb-2">
                      <TextInput
                        name="name"
                        type="text"
                        inputClassNames={inputClassNames}
                        containerClassNames={containerClassNames}
                        placeholder="Your Name"
                      />
                      <TextInput
                        name="email"
                        type="email"
                        inputClassNames={inputClassNames}
                        containerClassNames={containerClassNames}
                        placeholder="Email Address"
                      />
                    </div>

                    <textarea
                      name="message"
                      className={
                        inputClassNames +
                        "  border-2 border-[#0000001A] rounded-[30px] w-full h-[196px] px-5"
                      }
                      placeholder="Message"
                    ></textarea>

                    <button
                      className="bg-primary w-fit rounded-full text-[12px] text-white font-bold py-3 px-7"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Post Comment
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </div>
      </BlogLayout>
    </div>
  );
};

export default BlogDetails;