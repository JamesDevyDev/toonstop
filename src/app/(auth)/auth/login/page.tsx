'use client'
import React, { useState } from 'react'
import useAuthStore from '@/zustand/useAuthStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Page = () => {
    const { LoginFunction } = useAuthStore()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setError('')
        const data = await LoginFunction({ username, password })
        if (data?.error) {
            setError(data?.error)
            return
        }
        console.log(data)
        router.push('/home/1')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#d7af57] px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-[#d7af57] text-white w-full max-w-md space-y-6"
            >
                <Link href='/home/1' className='w-full h-[100px] flex items-center justify-center'>
                    <img src='/assets/logo.png' className='w-[200px] h-[200px]' />
                </Link>

                <p className="text-center text-sm text-black">
                    Login to Toonstop with your username or email address
                </p>

                <div>
                    <label className="block mb-1 font-semibold text-sm text-black" htmlFor="email">
                        Email or Username<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        autoComplete="username"
                        id="email"
                        placeholder="e.g. johndoe@example.com"
                        className="w-full px-4 py-2 bg-[#161b22] text-white border border-[#30363d] rounded focus:outline-none"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-sm text-black" htmlFor="password">
                        Password<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 bg-[#161b22] text-white border border-[#30363d] rounded focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}


                <button
                    type="submit"
                    className="w-full bg-black hover:bg-black/80 text-white font-bold py-2 rounded cursor-pointer"
                >
                    Login
                </button>

                <p className="text-center text-sm text-black">
                    Dont have an account?{' '}
                    <Link href="/auth/register" className="text-[#ff4567] hover:underline">
                        register
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Page
