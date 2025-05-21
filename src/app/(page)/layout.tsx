import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className='overflow-x-hidden w-[100vw] h-[100vh] relative'>
            <Header />
            {children}
            <Footer/>
        </div>
    );
}
