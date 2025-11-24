import React from "react"
import BannerHome from "../../components/BannerHome/BannerHome"
import CategoriesHome from "../../components/CategoriesHome/CategoriesHome"
import ComingSoonWatchesPage from "../../components/ComingSoonWatchesPage/ComingSoonWatchesPage"
import WatchOfferBanner from "../../components/FashionPage/FashionPage"
import TestimonialPage from "../../components/TestimonialPage/TestimonialPage"
import Footer from "../../components/Footer/Footer"

const Home = () => {
    return (
        <div>
            <BannerHome />
            <CategoriesHome />
            <ComingSoonWatchesPage />
            <WatchOfferBanner />
            <TestimonialPage />
            <Footer />
        </div>
    )
}

export default Home