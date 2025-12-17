import React, { useState } from "react";
import {
    ArrowLeft,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function SignUpPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false)


    const API_BASE = 'http://localhost:5000'

    const handleSubmit = async (e) => {
        e.preventDefault();

        // enforce all fields
        if (!name.trim() || !email.trim() || !password) {
            toast.error("Please fill in all fields.", {
                position: "top-right",
                autoClose: 4000,
                theme: "light",
            });
            return;
        }

        // simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.", {
                position: "top-right",
                autoClose: 4000,
                theme: "light",
            });
            return;
        }

        // require remember me explicitly
        if (!rememberMe) {
            toast.error("Please tick 'Remember me' to continue.", {
                position: "top-right",
                autoClose: 4000,
                theme: "light",
            });
            return;
        }

        setSubmitting(true)

        try {
            const resp = await axios.post(`${API_BASE}/api/auth/register`,
                {
                    username: name.trim(),
                    email: email.trim().toLocaleLowerCase(),
                    password
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            )
            const data = resp.data

            if (data && data.token) {
                if (rememberMe) {
                    localStorage.setItem("authToken", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user ?? {}))
                } else {
                    sessionStorage.setItem("authToken", data.token)
                    sessionStorage.setItem("user", JSON.stringify(data.user ?? {}))
                }

                toast.success(data.message || "signup successful", {
                    position: "top-right",
                    autoClose: 1200,
                    theme: "light"
                })
                setTimeout(() => {
                    navigate("/login")
                }, 1250)
            }else{
                 toast.error(data.message || "Unexpected server response", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "light"
                })
            }
        } catch (err) {
            const serverMsg = err?.response?.data?.message
            const status = err?.response?.status

            if(status === 409){
                 toast.error(serverMsg || "User already exists", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "light"
                })
            } else if (serverMsg){
                 toast.error(serverMsg, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "light"
                })
            } else{
                 toast.error("server erro, please try again later", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "light"
                })
            }
            console.log("signup error",err?.response ?? err)
        }finally{
            setSubmitting(false)
        }

    }        

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex pt-20 items-center justify-center p-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}
        >
            <ToastContainer />

            {/* Back button top-left */}
            <button
                aria-label="Back to home"
                onClick={() => navigate("/login")}
                className="absolute top-6 left-6 cursor-pointer z-30 bg-gradient-to-br from-gray-200 to-gray-400 backdrop-blur-sm rounded-full p-2 shadow-sm flex items-center justify-center transition-transform transform "
            >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
                <span className="ml-1 font-[pacifico]">Back to Login</span>
            </button>

            <div className="w-full max-w-md">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-8 py-10 relative overflow-hidden">
                    {/* Decorative top-right circle */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full opacity-80 filter blur-sm"></div>

                    <h1
                        className="text-2xl font-semibold text-gray-800 text-center mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Create account
                    </h1>
                    <p className="text-center text-sm text-gray-500 font-[pacifico] mb-6">
                        Simple signup to get you started — light & clean.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="text-sm text-gray-600 block">Full name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your full name"
                                required
                                className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
                            />
                        </div>

                        <label className="text-sm text-gray-600 block">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 block">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    required
                                    className="w-full pl-10 pr-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 cursor-pointer pr-3 flex items-center"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex cursor-pointer items-center text-sm select-none">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    required
                                    className="h-4 w-4 text-teal-500 border-gray-300 rounded focus:ring-gray-400"
                                />
                                <span className="ml-2 text-gray-700">Remember me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-full font-[pacifico] cursor-pointer bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 font-medium shadow-md text-xl  hover:-translate-y-0.5 transition-transform"
                        >
                            Sign up
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-500">Already have an account? </span>
                        <a href='/login' className="text-sm text-black  font-medium">
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
