'use client'

import React, { useEffect, useState } from 'react'
import useAuthStore from '@/zustand/useAuthStore'
import { useRouter } from 'next/navigation'

const Page = () => {
    const { authUser, getAuthUserFunction } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if(!authUser){
            router.push('/home/1')
        }
    }, [authUser])


    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [newName, setNewName] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [avatarError, setAvatarError] = useState('')
    const [nameError, setNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    // Loading states
    const [isAvatarLoading, setIsAvatarLoading] = useState(false)
    const [isNameLoading, setIsNameLoading] = useState(false)

    const [isPasswordLoading, setIsPasswordLoading] = useState(false)

    const handleChangeName = async (e: React.FormEvent) => {
        e.preventDefault()
        setNameError('')
        if (!newName.trim()) {
            setNameError('Name cannot be empty')
            return
        }
        setIsNameLoading(true)
        try {
            const res = await fetch('/users/change/name', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newName }),
            })
            const data = await res.json()
            if (!res.ok) {
                setNameError(data)
                setIsNameLoading(false)
                return
            }
            setNewName('')
            await getAuthUserFunction()
        } catch (error) {
            setNameError('Server error')
            console.log(error)
        } finally {
            setIsNameLoading(false)
        }
    }

    const handleChangeAvatar = async (e: React.FormEvent) => {
        e.preventDefault()
        setAvatarError('')
        if (!avatarFile) {
            setAvatarError('No file selected')
            return
        }
        setIsAvatarLoading(true)
        const toBase64 = (file: File): Promise<string> =>
            new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result as string)
                reader.onerror = reject
            })
        try {
            const base64Avatar = await toBase64(avatarFile)
            const res = await fetch('/users/change/avatar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newAvatar: base64Avatar }),
            })
            const data = await res.json()
            if (!res.ok) {
                setAvatarError(data)
                setIsAvatarLoading(false)
                return
            }
            setAvatarFile(null)
            await getAuthUserFunction()
        } catch (error) {
            console.error(error)
            setAvatarError('Server error')
        } finally {
            setIsAvatarLoading(false)
        }
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setPasswordError('')
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError('All fields are required')
            return
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match')
            return
        }
        setIsPasswordLoading(true)
        try {
            const res = await fetch('/users/change/password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
            })
            const data = await res.json()
            if (!res.ok) {
                setPasswordError(data)
                setIsPasswordLoading(false)
                return
            }
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
            await getAuthUserFunction()
        } catch (error) {
            setPasswordError('Server error')
            console.log(error)
        } finally {
            setIsPasswordLoading(false)
        }
    }

    return (
        <div className='bg-gray-900 w-full pb-[50px] px-[10%] md:px-[20%] lg:px-[30%] min-h-[100vh]'>
            <div className="relative text-[22px] flex items-center justify-center flex-col w-full">
                <div className="text-[22px] font-bold my-[40px] border-b border-gray-700 pb-2 text-center w-full">
                    USER SETTINGS
                </div>

                {/* Profile Picture Upload */}
                <form onSubmit={handleChangeAvatar} className="gap-6 mb-10 flex items-center justify-center flex-col w-full">
                    <div className="w-28 h-28 bg-[#d7af57] rounded-full overflow-hidden flex items-center justify-center">
                        <img src={authUser?.avatar} alt="profile" className="w-[90%] h-[90%] rounded-full object-cover" />
                    </div>
                    <div className='flex items-center justify-center w-full gap-[5px]'>
                        <input
                            type="file"
                            className="file-input"
                            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                        />
                        <button
                            type="submit"
                            className={`btn bg-[#d7af57] ${isAvatarLoading ? 'loading' : ''}`}
                            disabled={isAvatarLoading}
                        >
                            {isAvatarLoading ? 'Uploading' : 'Upload'}
                        </button>
                    </div>
                    {avatarError && <p className="text-red-400 text-sm mt-2">{avatarError}</p>}
                </form>

                {/* Change Name Section */}
                <form onSubmit={handleChangeName} className="mb-10 border-t border-gray-700 pt-6 w-full">
                    <h3 className="mb-2 font-semibold">Change Name</h3>
                    <p className="text-sm mb-2">Your name: <span className="text-red-400">{authUser?.username}</span></p>
                    <input
                        type="text"
                        placeholder="New Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="block mb-2 px-3 py-2 w-full rounded bg-gray-800 border border-gray-700"
                    />
                    <button
                        type="submit"
                        className={`btn bg-[#d7af57] ${isNameLoading ? 'loading' : ''}`}
                        disabled={isNameLoading}
                    >
                        {isNameLoading ? 'Saving' : 'Submit'}
                    </button>
                    {nameError && <p className="text-red-400 text-sm mt-2">{nameError}</p>}
                </form>

                {/* Change Password Section */}
                <form onSubmit={handleChangePassword} className="mb-10 border-t border-gray-700 pt-6 w-full">
                    <h3 className="mb-2 font-semibold">Change Password</h3>
                    <input
                        type="password"
                        autoComplete="current-password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="block mb-2 px-3 py-2 w-full rounded bg-gray-800 border border-gray-700"
                    />
                    <input
                        type="password"
                        autoComplete="new-password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block mb-2 px-3 py-2 w-full rounded bg-gray-800 border border-gray-700"
                    />
                    <input
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block mb-2 px-3 py-2 w-full rounded bg-gray-800 border border-gray-700"
                    />
                    <button
                        type="submit"
                        className={`btn bg-[#d7af57] ${isPasswordLoading ? 'loading' : ''}`}
                        disabled={isPasswordLoading}
                    >
                        {isPasswordLoading ? 'Saving' : 'Submit'}
                    </button>
                    {passwordError && <p className="text-red-400 text-sm mt-2">{passwordError}</p>}
                </form>
            </div>
        </div>
    )
}

export default Page
