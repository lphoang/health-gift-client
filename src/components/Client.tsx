import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'components/Global/Footer';
import Header from "components/Global/Header"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Client() {

    useEffect(() => {
        document.title = "Health Gift | Trang chủ"
    })

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col md:flex-col justify-between bg-indigo-50 max-h-fit">
                <main className="bg-opacity-100 min-h-screen max-h-fit">
                    <div className="mx-auto py-6 sm:px-6 lg:px-1 min-h-screen max-h-fit">
                        <div className={classNames(`box-border p-10 border-4 bg-white w-3/4 mx-auto rounded-md min-h-screen max-h-fit`)}>
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div >
            <Footer />
        </>
    );
}

export default Client;