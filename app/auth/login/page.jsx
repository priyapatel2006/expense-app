"use client"
import { useState } from 'react'
// import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"


function Login() {
    const [value, setValue] = useState({})
    const [eye, setEye] = useState(true)
    const router = useRouter()

    const handleChange = (e) => {
        setValue({ ...value, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('user', JSON.stringify({ name: value.email.split('@')[0], email: value.email, picture: '' }));
        setValue({})
        window.location.replace('/dashboard')
    }

    return (
        <div>
            <div className="bg-gray-100 font-display text-[#0f151a]">
                <div className=" flex flex-col items-center justify-center pt-6">
                    <div className="w-full max-w-[440px] bg-white  rounded-xl shadow-sm border border-[#e8eef2] :border-[#2d3a44] overflow-hidden">
                        <div className="p-6 sm:p-10 md:p-10">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
                                <p className="text-[#537893]  text-sm">Please enter your details to sign in.</p>
                            </div>
                            <form onSubmit={handleSubmit} action="#" className="space-y-6" method="POST">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-[#0f151a] ">Email Address</label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            onChange={handleChange}
                                            value={value.email || ""}
                                            name="email"
                                            type="email"
                                            placeholder="name@company.com"
                                            required
                                            className="mt-1 w-full h-12 px-4 rounded-lg border border-[#d1dde5] bg-transparent outline-none focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1 placeholder:text-[#537893]/50 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-semibold text-[#0f151a] ">Password</label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            onChange={handleChange}
                                            value={value.password || ""}
                                            name="password"
                                            className="mt-1 w-full h-12 px-4 rounded-lg border border-[#d1dde5] bg-transparent outline-none focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1 placeholder:text-[#537893]/50 transition-all duration-300"
                                            placeholder="••••••••" required="" type={eye ? "text" : "password"} />
                                        <button onClick={() => setEye(!eye)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#537893] hover:text-primary transition-colors" type="button">
                                            {eye ? (<img src="/images/icons/eye.svg" className="w-6 h-6" />) : (
                                                <img src="/images/icons/eye-off 1.svg" className="w-6 h-6" />)}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            className="w-5 h-5 accent-[#1a6296] hover:accent-[#a228c1] cursor-pointer transition"
                                            type="checkbox" />
                                        <span className="text-[#537893] :text-gray-400 group-hover:text-[#0f151a] :group-hover:text-white transition-colors">Remember me</span>
                                    </label>
                                    <a className="text-primary font-semibold hover:underline decoration-2 underline-offset-4" href="#">Forgot Password?</a>
                                </div>
                                <button className="w-full h-12 mt-3 bg-purple-800 hover:bg-[#1a6296] text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" type="submit">
                                    Sign In
                                </button>
                            </form>
                            <div className="relative my-10">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#e8eef2] :border-[#2d3a44]"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white :bg-[#1c262e] px-4 text-[#537893]">Or continue with</span>
                                </div>
                            </div>
                            <div className="grid  gap-4">
                                {/* <button className="flex items-center justify-center gap-2 h-11 border border-[#d1dde5] :border-[#3a4b58] rounded-lg hover:bg-gray-50 :hover:bg-[#25323c] transition-colors">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                    </svg>
                                    <span className="text-sm font-semibold">Google</span>
                                </button> */}
                                <GoogleLogin

                                    onSuccess={credentialResponse => {
                                        const decoded = jwtDecode(credentialResponse.credential);
                                        localStorage.setItem('user', JSON.stringify({ name: decoded.name, picture: decoded.picture, email: decoded.email }));
                                        window.location.replace("/dashboard")
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </div>
                        </div>
                        <div className="bg-gray-50 :bg-[#1a232b] px-10 py-5 text-center border-t border-[#e8eef2] :border-[#2d3a44]">
                            <p className="text-sm text-[#537893] :text-gray-400">
                                Don't have an account?
                                <a className="text-purple-800 font-bold hover:underline ml-1" href="#">Sign Up</a>
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 flex gap-4 sm:gap-6 text-xs text-[#537893] :text-gray-500 font-medium flex-wrap justify-center">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                        <a className="hover:text-primary transition-colors" href="#">Help Center</a>
                    </div>
                </div>
                <div className="fixed top-0 left-0 w-full h-1 bg-primary"></div>
            </div>
        </div>

    )
}
export default Login