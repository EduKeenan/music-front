import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { NavBarAdm } from "../NavBar/navBar";

// export function PrivateRoutes() {
//   let token = localStorage.getItem("token") == null ? false : true;
//   return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
// }

export function PrivateRoutes() {
  let token = localStorage.getItem("token");
  if (!token) {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }
  const meuToken = decodeToken(token);
  console.log('to dentro', meuToken)
  if (!meuToken.adm) {
    return (
      <>
        <NavBarAdm adm={false} />
        <Outlet/>
      </>
    );
  } else {
    return (
      <>
        <NavBarAdm adm={true} />
        <Outlet/>
      </>
    );
  }
}
