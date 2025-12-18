import VideoPlayer from "../VideoPlayer";

interface Props {
  videoSrc: string;
  onClose: () => void;
}

function VideoPopup({ videoSrc, onClose }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="pb-4 px-4 pt-2 w-full  lg:w-[70%] rounded-[12px] shadow-lg">
        <div className=" flex justify-end">
          <img
            onClick={onClose}
            src="/svg/x.svg"
            alt=""
            className="bg-white h-7 w-7 rounded-full flex justify-center items-center cursor-pointer p-1 mt-1 mb-3"
          />
        </div>

        {videoSrc ? (
          <>
            {/* <VideoPlayer
              src={videoSrc}
              classNames="w-full h-auto max-w-full max-h-[80vh]"
            /> */}
            <div
              style={{
                // width: "80%",
                margin: "0 auto",
                aspectRatio: "16 / 9",
                maxHeight: "80vh",
              }}
              className="w-full lg:w-4/5"
            >
              <iframe
                style={{
                  width: "100%",
                  height: "100%",
                }}
                src={videoSrc}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </>
        ) : (
          <div className="text-white">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default VideoPopup;

//  <video
//    src={videoSrc}
//    controls
//    onError={(e) => console.error("Error loading video:", e)}
//    className="w-full h-auto max-w-full max-h-[80vh]"
//  />;
