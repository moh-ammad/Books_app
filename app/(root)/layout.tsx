import Navbar from "@/components/navbar";


const RootLayout=(
    {children}:Readonly<{children: React.ReactNode}>
)=>{
    return(
        <main className="font-work-sans">
            <Navbar/>
            {children}
        </main>
    )
}
export default RootLayout;