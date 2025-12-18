import React, { ReactNode } from "react";

interface Props {
  postedBy: string;
  datePosted: string;
  commentCounts: number;
  title: string;
  text: string;
  images?: string[];
  footer: ReactNode;
}

const BlogItem = ({
  postedBy,
  datePosted,
  commentCounts,
  text,
  title,
  images = [],
  footer,
}: Props) => {
  const processHTMLContent = (htmlContent: string) => {
    return htmlContent
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  return (
    <div className="w-full lg:w-[682px] -mb-[100px]">
      {/* Main featured image */}
      {images[0] && (
        <img 
          src={images[0]} 
          alt={title} 
          className="rounded-[24px] relative top-[100px] w-full h-auto max-h-[500px] object-cover" 
        />
      )}
      
      <div className="bg-white shadow-lg relative rounded-tr-[80px] rounded-b-[25px] py-8 px-5 lg:px-10">
        <div className="flex flex-wrap items-center text-[12px] text-[#333333] gap-2 mb-5">
          <img src="/svg/user.svg" alt="Author" />
          <span>{postedBy}</span>
          <img src="/svg/calendar5.svg" alt="Date" />
          <span>{datePosted}</span>
          <img src="/svg/comment.svg" alt="Comments" />
          <span>Comments ({commentCounts})</span>
        </div>
        
        <h1 className="text-[24px] lg:text-[36px] text-[#333333] font-bold leading-8 lg:leading-[44px] mb-6">
          {title}
        </h1>

        {/* Additional images gallery */}
        {images.length > 1 && (
          <div className="grid grid-cols-2 gap-4 my-8">
            {images.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${title} - Image ${index + 2}`}
                className="rounded-lg w-full h-auto max-h-[300px] object-cover"
              />
            ))}
          </div>
        )}

        <div 
          className="prose prose-sm lg:prose-lg max-w-none
            prose-headings:text-[#333333] prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
            prose-h2:text-[28px] prose-h3:text-[24px] prose-h4:text-[20px]
            prose-p:text-[#555555] prose-p:font-light prose-p:leading-relaxed prose-p:text-[16px] 
            lg:prose-p:text-[18px] prose-p:mb-6
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 
            prose-blockquote:italic prose-blockquote:text-[#555555]
            prose-strong:text-[#333333] prose-strong:font-semibold
            prose-em:text-[#333333] prose-em:italic
            prose-ul:text-[#555555] prose-ul:text-[16px] lg:prose-ul:text-[18px] prose-ul:mb-6
            prose-li:text-[#555555] prose-li:font-light prose-li:leading-relaxed prose-li:mb-2
            prose-a:text-primary prose-a:underline hover:prose-a:text-[#CA2421]
            prose-img:rounded-lg prose-img:shadow-md prose-img:my-6 prose-img:w-full prose-img:h-auto
            space-y-4 lg:space-y-6"
          dangerouslySetInnerHTML={{ 
            __html: processHTMLContent(text) 
          }}
        />
        
        {footer}
      </div>
    </div>
  );
};

export default BlogItem;