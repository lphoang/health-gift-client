import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { selectIsLogged } from "features/slices/authSlice";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAppSelector } from "app/hooks";

function Dashboard() {
  const isLogged = useAppSelector(selectIsLogged);
  const isAdmin = useAppSelector(state => state.auth.isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      !(isLogged && isAdmin) && navigate("/auth");
    }, 400)

    return clearTimeout(timer);
  }, [isLogged, isAdmin]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="h-screen min-h-screen flex flex-col md:flex-col justify-between">
        <main className="bg-gray-100 bg-opacity-100 min-h-screen ">
          <div className="mx-auto py-6 sm:px-6 lg:px-1 min-h-screen">
            <div className="box-border p-4 border-4 bg-white rounded-md min-h-screen">
              <div className="container my-12 mx-auto px-4 md:px-12">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
