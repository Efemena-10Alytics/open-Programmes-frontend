"use client";

import React from "react";

interface LoadingOverlayProps {
    message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    message = "Loading..."
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
                <div className="loader"></div>
                <p className="text-gray-700 font-medium text-lg">{message}</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;
