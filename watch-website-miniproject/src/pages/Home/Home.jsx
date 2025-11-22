import React from "react"
import BannerHome from "../../components/BannerHome/BannerHome"
import CategoriesHome from "../../components/CategoriesHome/CategoriesHome"
import ComingSoonWatchesPage from "../../components/ComingSoonWatchesPage/ComingSoonWatchesPage"

const Home = () => {
    return (
        <div>
            <BannerHome/>
            <CategoriesHome/>
            <ComingSoonWatchesPage/>

        </div>
    )
}

export default Home