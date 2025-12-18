import Link from "next/link";
import Button from "../components/utilities/Button";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Navbar from "../components/layout/Navbar";
import Logo from "../components/layout/Logo";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

const VideoModal = ({ isOpen, onClose, videoId, title }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] p-6 w-11/12 max-w-4xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[18px] lg:text-[20px] font-semibold text-dark">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-[12px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const AIJoin = () => {
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const testimonialVideos = [
    {
      title: "How Helen got a role as a data analyst",
      videoId: "qiSzYUoWTEg",
      thumbnail: `https://img.youtube.com/vi/qiSzYUoWTEg/maxresdefault.jpg`,
    },
    {
      title: "How I got promoted",
      videoId: "-FBxXCWKpVw",
      thumbnail: `https://img.youtube.com/vi/-FBxXCWKpVw/maxresdefault.jpg`,
    },
    {
      title: "How I landed an M and E role",
      videoId: "OHC6jyhL4Mw",
      thumbnail: `https://img.youtube.com/vi/OHC6jyhL4Mw/maxresdefault.jpg`,
    },
    {
      title: "I just got hired as a data coach",
      videoId: "jBVy-DyeL5A",
      thumbnail: `https://img.youtube.com/vi/jBVy-DyeL5A/maxresdefault.jpg`,
    },
    {
      title: "How I landed the job where over 90 people enrolled",
      videoId: "lTu71vsTBVU",
      thumbnail: `https://img.youtube.com/vi/lTu71vsTBVU/maxresdefault.jpg`,
    },
    {
      title: "I built a dashboard with Zero Experience",
      videoId: "ERycA__67hM",
      thumbnail: `https://img.youtube.com/vi/ERycA__67hM/maxresdefault.jpg`,
    },
  ];

  const scrollToVideo = () => {
    const videoSection = document.getElementById("main-video-section");
    if (videoSection) {
      videoSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const openVideoModal = (videoId: string, title: string) => {
    setSelectedVideo({ id: videoId, title });
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <Logo />
      <main>
        {/* Hero Section */}
        <section className="mx-auto pt-[20px] lg:pt-[70px] pb-[60px]">
          <div className="w-11/12 mx-auto text-center">
            <h1 className="text-dark text-[28px] lg:text-[48px] font-bold leading-[36px] lg:leading-[60px] mb-6">
              FOR ANYONE READY TO{" "}
              <span className="text-primary">DOMINATE THEIR JOB SEARCH</span>{" "}
              WITH CUTTING-EDGE AI & SMART ALERTS IN 2026
            </h1>

            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-dark text-[16px] lg:text-[20px] leading-[24px] lg:leading-[28px] mb-6">
                This 30-Minute Video Guide Provides A Clear, Step-By-Step
                Framework To Help You Master Google Alerts And Cutting-Edge AI
                Tools To Land Your Dream Job In 2026 Without Endless Scrolling
                Or Wasting Time On Outdated Strategies.
              </p>

              <p className="text-[#828282] text-[14px] lg:text-[18px] leading-[22px] lg:leading-[26px]">
                While also helping you cut through the noise, target ideal
                opportunities, and transform your job application success rate
                strategically.
              </p>
            </div>

            <button
              onClick={scrollToVideo}
              className="bg-primary hover:bg-opacity-90 text-white px-8 py-4 rounded-full text-[16px] lg:text-[18px] font-semibold transition-colors mb-4"
            >
              Hit play below ⬇️
            </button>
          </div>
        </section>

        {/* Video Section */}
        <section
          id="main-video-section"
          className="bg-[#FFF4F4] py-12 lg:py-20"
        >
          <div className="w-11/12 lg:w-[70%] mx-auto">
            <div className="relative bg-black rounded-[20px] overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <video
                  width="100%"
                  height="100%"
                  controls
                  className="w-full h-full"
                  poster="https://img.youtube.com/vi/OHC6jyhL4Mw/maxresdefault.jpg"
                >
                  <source
                    src="https://player.vimeo.com/progressive_redirect/playback/1113942397/rendition/720p/file.mp4?loc=external&signature=3b65fa2cf4ec52524a0b02dba8c89767c6e85864b31f235d67fb841685067f46"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className="text-center mt-8">
              <a
                href="https://calendly.com/enquiries-nebiant/clarity-session"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  text="Speak to a career counselor at no cost"
                  classNames="text-[16px] lg:text-[18px] px-8 py-4"
                />
              </a>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 lg:py-16">
          <div className="w-11/12 mx-auto text-center">
            <p className="text-[#828282] text-[16px] lg:text-[20px] font-medium mb-8">
              Trusted by over 5,000 students
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-6 h-6 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {/*<section className="bg-black text-white py-16 lg:py-24">
          <div className="w-11/12 mx-auto">
            <h2 className="text-[28px] lg:text-[42px] font-bold text-center mb-4 leading-[36px] lg:leading-[52px]">
              YouTube testimonial videos👇
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
              {testimonialVideos.map((video, index) => (
                <div
                  key={index}
                  className="bg-[#1a1a1a] rounded-[16px] overflow-hidden hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => openVideoModal(video.videoId, video.title)}
                >
                  <div
                    className="aspect-video relative group rounded-t-[16px] overflow-hidden"
                    onClick={() => openVideoModal(video.videoId, video.title)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                      <div className="w-16 h-16 bg-primary bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <svg
                          className="w-6 h-6 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 5v10l8-5-8-5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      YouTube
                    </div>
                  </div>
                  <div className="p-4 bg-[#1a1a1a]">
                    <h3 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[22px] text-white mb-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Click to watch</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        {
          /*
       
        <section
          style={{
            backgroundImage: "url('img/home-img8.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
          }}
          className="flex flex-col items-center h-[400px] lg:h-[500px] pt-[80px] lg:pt-[120px]"
        >
          <h2 className="w-[90%] lg:w-[60%] mx-auto text-[24px] lg:text-[36px] font-bold leading-[32px] lg:leading-[45px] text-center text-dark mb-6">
            Ready to Transform Your{" "}
            <span className="text-primary">Job Search Strategy</span>?
          </h2>

          <p className="w-[90%] lg:w-[50%] mx-auto text-[#667085] text-center text-[16px] lg:text-[20px] leading-[24px] lg:leading-[28px] mb-8">
            Get personalized guidance from our career counselors and start
            implementing these AI-powered job search strategies today.
          </p>

          <a
            href="https://calendly.com/enquiries-nebiant/clarity-session"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              text="Speak to a career counselor at no cost"
              classNames="text-[16px] lg:text-[18px] px-8 py-4"
            />
          </a>
        </section>
         */}

        {/* Video Modal */}
        {selectedVideo && (
          <VideoModal
            isOpen={!!selectedVideo}
            onClose={closeVideoModal}
            videoId={selectedVideo.id}
            title={selectedVideo.title}
          />
        )}
      </main>
    </>
  );
};

export default AIJoin;
