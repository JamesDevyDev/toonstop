import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#d7af57] px-4">
            <div className="text-center flex items-center justify-center flex-col text-black">
                <img src='/assets/logo.png' className='w-[300px] h-[300px]'/>
                <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                <p className="mt-4 text-black">Sorry, the page you are looking for doesn't exist.</p>
                <Link href='/home/1' className='p-[10px] bg-black text-white rounded-lg font-bold mt-[15px]'>Go Back to HOME.</Link>
            </div>
        </div>
    )
}