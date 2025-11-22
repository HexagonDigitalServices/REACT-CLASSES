import React, { useEffect, useRef } from "react";
import video from "../../assets/bannervideo.mp4"
import Navbar from "../Navbar/Navbar";

const BannerHome = () => {
    const videoRef = useRef(null)

    useEffect(() => {
        // Respect prefers-reduced-motion
        const reduceMotion =
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce").matches

        if (reduceMotion && videoRef.current) {
            videoRef.current.pause()
            videoRef.current.removeAttribute("autoplay")
        }
    }, [])

    return (
        <div className="relative overflow-hidden min-h-[90vh] flex flex-col">
            {/* Navbar always on top  */}
            <div className="absolute top-0 pt-10 left-0 w-full z-20">
                <Navbar />
            </div>

            {/* Video background (now visible on all screens) */}
            <div className="abosolute inset-0 z-0">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster=""
                    aria-hidden="true"
                    role="presentation"
                >
                    <source src={video} type="video/mp4" />
                </video>

            </div>

            {/* Content  */}
            <div className="container mx-auto px-4 py-24 z-10 pt-40 relative flex flex-col items-center text-center">
                <div className="mb-12 md:mb-16">
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light mb-4 md:mb-6 leading-tight"
                        style={{ fontFamily: "'Playfair Display',serif" }}
                    >
                        <span className="inline text-gray-100">Love you more</span>
                        <span className="text-yellow-500 font-[pacifico] inline-block ml-2 sm:ml-4">
                            with each tick-tock
                        </span>
                    </h1>
                    <p className="text-white font-[pacifico] max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light">
                        Discover our exclusive collection of handcrafted timepieces that embody precision, luxury, and timeless style.
                    </p>
                </div>

                {/* Card Section  */}
                <div className="relative w-full max-w-5xl mx-auto">
                    {/* Responive grid:
                        -mobile (<=sm-1): 1 column (stacked vertical)
                        -sm (>=640):2 columns
                        -md (>=768) and lg (>=1024): 3 columns
                     */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-end">
                        {/* Left card  */}
                        <div className="flex flex-col items-center transform rotate-0 sm:-rotate-12 md:-rotate-3 transition-all duration-500 xl:hover:rotate-0 xl:hover:scale-110 lg:-rotate-4">
                            <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl p-4 sm:p-6 shadow-2xl border-gray-800 w-full">
                                <img
                                    src="https://images7.alphacoders.com/473/473263.jpg"
                                    alt="Luxury watch"
                                    className="w-full h-44 sm:h-56 md:h-64 lg:h-64 object-cover rounded-lg"
                                    loading="lazy"
                                />
                            </div>
                            <p className="mt-3 text-gray-300 font-light text-sm sm:text-base">Classic Heritage</p>
                        </div>

                        {/* Middle Card  */}
                        <div className="flex flex-col items-center transform translate-y-0 sm:translate-y-8 md:-translate-y-16 transition-all duration-500 pt-3 hover:translate-y-0 hover:scale-110">
                            <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl p-4 sm:p-6 shadow-2xl border-yellow-600/30 w-full">
                                <img
                                    src="https://wallpapercave.com/wp/wp11404704.jpg"
                                    alt="Premium watch"
                                    className="w-full h-52 sm:h-64 md:h-72 lg:h-72 object-cover rounded-lg"
                                    loading="lazy"
                                />
                            </div>
                            <p className="mt-3 text-yellow-500 font-light text-sm sm:text-base">Limited Edition</p>
                        </div>

                        {/* Right card  */}
                        <div className="flex flex-col items-center transform rotate-0 sm:-rotate-12 md:-rotate-4 transition-all duration-500 xl:hover:rotate-0 xl:hover:scale-110 lg:rotate-5">
                            <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl p-4 sm:p-6 shadow-2xl border border-gray-800 w-full">
                                <img
                                    src="https://i.pinimg.com/736x/17/b2/c3/17b2c3de0dd397d79ffeae0151f4dc61.jpg"
                                    alt="Modern watch"
                                    className="w-full h-44 sm:h-56 md:h-64 lg:h-64 object-cover rounded-lg"
                                    loading="lazy"
                                />
                            </div>
                            <p className="mt-3 text-gray-300 font-light text-sm sm:text-base">Modern Precision</p>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default BannerHome