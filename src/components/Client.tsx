import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'components/Global/Footer';
import Header from "components/Global/Header"

function Client() {

    useEffect(() => {
        document.title = "Health Gift | Trang chủ"
    })

    return (
        <>
            <Header />
            <div className="h-screen min-h-screen flex flex-col md:flex-col justify-between bg-indigo-50">
                <main className="bg-opacity-100 min-h-screen">
                    <div className="mx-auto py-6 sm:px-6 lg:px-1 min-h-screen">
                        <div className="box-border p-10 border-4 bg-white w-3/4 mx-auto rounded-md min-h-screen">
                            <Outlet />
                        </div>
                    </div>
                    <Footer />
                </main>
            </div >
        </>
    );
}

export default Client;