import React, { useEffect, useState } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Home from "./pages/Home/Home"
import Watches from "./pages/Watches/Watches"
import Contact from "./pages/Contact/Contact"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import Orders from "./pages/Orders/Orders"
import Cart from "./pages/Cart/Cart"
import { ArrowUp } from "lucide-react"
import Brand from "./pages/Brand/Brand"


function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])
  return null
}

function ProtectedRoute({ children }) {
  const location = useLocation()

  // Example auth checks (choose one)
  // 1. LocalStorage token 
  const isAuthenticated = Boolean(localStorage.getItem('authToken'))

  // 2. If you have an AuthContext 
  // const {user} = useContext(AuthContext)
  // const isAuthenticated = !!user - user = ankit, !ankit = false, !!ankit = true

  // 3. If you use Firebase Auth
  // const [user,loading] = useAuthState(firebaseAuth)
  // if(loading) return <LoadingComponent/>
  // const isAuthenticated = !!user

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  )
}

function App() {
  const [showButton,setShowButton] = useState(false)

  useEffect(()=>{
    const onScroll = () => setShowButton(window.scrollY >300)
    onScroll()
    window.addEventListener("scroll",onScroll)
    return () => window.removeEventListener("scroll",onScroll)
  })

  useEffect(()=>{
    const prevOverflowX = document.documentElement.style.overflowX
    const prevBodyMargin = document.body.style.margin
    document.documentElement.style.overflowX = "hidden"
    document.body.style.margin = "0"

    return () =>{
      document.documentElement.style.overflowX = prevOverflowX || ""
      document.body.style.margin = prevBodyMargin || ""
    }
  })

  const scrollToTop = () => window.scrollTo({top:0,behavior:"smooth"})

  return (
    <div className="min-h-screen w-screen overflow-x-hidden antialiased">
      <ScrollToTopOnRouteChange/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watches" element={<Watches />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/brands/:brandName" element={<Brand/>}/>

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed right-6 bottom-6 z-50 flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300
          ${showButton ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}
          bg-gray-400 text-white hover:bg-amber-700`}
        >
          <ArrowUp size={18}/>
        </button>
    </div>
  )
}

export default App
