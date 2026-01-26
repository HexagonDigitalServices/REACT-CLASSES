import React from 'react'
import HeroHome from '../../components/HeroHome/HeroHome'
import Navbar from '../../components/Navbar/Navbar'
import OurProcess from '../../components/OurProcess/OurProcess'
import ParentsWork from '../../components/ParentsWork/ParentsWork'
// import RecentlyJoin from '../../components/RecentlyJoin/RecentlyJoin'
import Footer from '../../components/Footer/Footer'

const Home = () => {
    return (
        <>
            <Navbar />
            <HeroHome />
            <OurProcess />
            <ParentsWork />
            <Footer />

        </>
    )
}

export default Home