import React, { useState } from "react";

interface DownloadButtonProps {
  fileId: string | null;
  label: string;
  downloadingLabel: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  fileId,
  label,
  downloadingLabel,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!fileId) return null;

  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  const handleDownload = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setIsDownloading(true);

    // Reset the button state after a short delay
    setTimeout(() => {
      setIsDownloading(false);
    }, 3000);
  };

  return (
    <a href={downloadUrl} download onClick={handleDownload}>
      <button
        className="flex-[0.6] w-full btn-gradient flex justify-center items-center py-3 px-4 rounded-[10px] border text-white"
        disabled={isDownloading}
      >
        {isDownloading ? downloadingLabel : label}
      </button>
    </a>
  );
};

export default DownloadButton;
