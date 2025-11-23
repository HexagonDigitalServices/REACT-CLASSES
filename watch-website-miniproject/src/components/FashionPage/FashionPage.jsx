import React, { useState, useEffect } from "react";
import { Clock, Heart, Shield, Truck } from "lucide-react";

const WatchOfferBanner = () => {
    const [timeLeft, setTimeLeft] = useState({
        Days: 2,
        Hours: 12,
        Minutes: 45,
        Seconds: 18
    })

    useEffect(()=>{
        const toTotalSeconds = (t)=>{
           return t.Days * 86400 + t.Hours * 3600 + t.Minutes * 60 + t.Seconds
        }
        const timer = setInterval(()=>{
            setTimeLeft((prev)=>{
                const total = toTotalSeconds(prev)

                if(total<=0){
                    clearInterval(timer)
                    return {Days:0,Hours:0,Minutes:0,Seconds:0}
                }

                const nextTotal = total -1

                const Days = Math.floor(nextTotal/86400);
                const Hours = Math.floor((nextTotal % 86400) / 3600);
                const Minutes = Math.floor((nextTotal % 3600)/60);
                const Seconds = Math.floor(nextTotal%60);
                return {Days,Hours,Minutes,Seconds}
            })
        },1000)
        return () => clearInterval(timer)
    },[])

    return (
        <div className="min-h-screen -mx-2 xl:-mx-0 md:-mx-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="max-w-6xl w-full">
                {/* Banner  */}
                <div className="bg-gradient-to-r from-gray-900 to-navy rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    {/* Content Section  */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative">
                        {/* Decorative elements  */}
                        <div className="absolute w-32 h-32 rounded-full border-4 border-gold/20 -top-8 -left-8"></div>
                        <div className="absolute w-16 h-16 rounded-full border-4 border-gold/20 bottom-12 -right-8"></div>

                        {/* Offer tag  */}
                        <div
                            className="bg-gold text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-6 self-start animate-pulse"
                            style={{ fontFamily: "'Playfair Display',serif" }}
                        >
                            Limited Time Offer
                        </div>

                        {/* Heading  */}
                        <h1
                            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
                            style={{ fontFamily: "'Playfair Display',serif" }}
                        >
                            Premium <span className="text-gold">Luxury Watches</span> Collection
                        </h1>

                        {/* Description  */}
                        <p className="text-gray-300 font-[pacifico] text-lg mb-8 max-w-md">
                            Discover our exclusive selection of premium timepieces with special discounts up to 30% off. Elevate your style with precision craftsmanship.
                        </p>

                        {/* Countdown Timer  */}
                        <div className="grid grid-cols-4 -mx-6 md:-mx-0 xl:-mx-0 gap-4 mb-8 max-w-md">
                            {Object.entries(timeLeft).map(([unit, value]) => (
                                <div key={unit} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-white">
                                        {String(value).padStart(2, '0')}
                                    </div>
                                    <div className="text-xs text-gray-200 mt-1">{unit}</div>
                                </div>
                            ))}
                        </div>

                        {/* Features  */}
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center text-gray-300">
                                <Truck size={18} className="text-gold mr-2" />
                                <span className="text-sm">Free Shipping</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <Shield size={18} className="text-gold mr-2" />
                                <span className="text-sm">2-Year Warranty</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <Heart size={18} className="text-gold mr-2" />
                                <span className="text-sm">30-Day Returns</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Section  */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-gradient-to-l from-gold/10 to-transparent z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80"
                            alt="Luxury watch"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />

                        {/* Price Tag  */}
                        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg">
                            <div className="text-xs text-gray-600 line-through">₹899.99</div>
                            <div className="text-2xl font-bold text-navy">₹629.99</div>
                            <div className="text-xs text-gold font-semibold">Save 30%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchOfferBanner