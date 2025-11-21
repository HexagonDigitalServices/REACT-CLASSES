import React, {useEffect,useRef} from "react";
import video from "../../assets/bannervideo.mp4"
import Navbar from "../Navbar/Navbar";

const BannerHome = () => {
    const videoRef = useRef(null)

    useEffect(()=>{
        // Respect prefers-reduced-motion
        const reduceMotion = 
        window.matchMedia && 
        window.matchMedia("(prefers-reduced-motion: reduce").matches

        if(reduceMotion && videoRef.current) {
            videoRef.current.pause()
            videoRef.current.removeAttribute("autoplay")
        }
    },[])

    return (
        <div className="relative overflow-hidden min-h-[90vh] flex flex-col">
            {/* Navbar always on top  */}
            <div className="absolute top-0 pt-10 left-0 w-full z-20">
                <Navbar/>
            </div>

            {/* Video background (now visible on all screens) */}
        </div>
    )
}