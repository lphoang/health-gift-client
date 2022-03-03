import { useAppDispatch } from '../../app/hooks';
import Loading from './Loading';
import { authLogout } from "features/slices/authSlice";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(authLogout());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, []);

  return (
    <div>
      <Loading/>
    </div>
  );
}
