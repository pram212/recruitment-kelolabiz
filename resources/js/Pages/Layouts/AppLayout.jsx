import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useEffect } from "react";
import { themeChange } from "theme-change";


export default function AppLayout({ children, headerContent = "No title" }) {

    useEffect(() => {
        themeChange(false);
        // 👆 false parameter is required for react project
    }, []);
    
    return (
        <>
            <div className="drawer lg:drawer-open">
                <input
                    id="my-drawer-3"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col min-h-screen">
                    <Navbar></Navbar>
                    <main className="px-10 py-2">
                        <div className="card bg-base-100 w-full shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{headerContent}</h2>
                                {children}
                            </div>
                        </div>
                    </main>
                    <Footer></Footer>
                </div>
                <div className="drawer-side">
                    <Sidebar></Sidebar>
                </div>
            </div>
        </>
    );
}
