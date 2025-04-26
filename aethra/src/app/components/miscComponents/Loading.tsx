"use client";
import Lottie from "lottie-react";
import aethraLoading from "../../../../public/3d/loading-animation.json"

export default function Loading() {
    return (
     <div className="flex justify-center items-center bg-black backdrop-blur-sm z-[1000] fixed top-0 left-0 w-full h-full">
        <div className="w-100 h-100">
            <Lottie animationData={aethraLoading} loop={true} />
        </div>
     </div>
    )
}