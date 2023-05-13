import { Navigate, Route, Routes } from "react-router-dom"
import { PeliculasPage } from "../aplicacion"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<PeliculasPage/>}/>

        <Route path="/*" element={<Navigate to="/"/>}></Route>
    </Routes>
  )
}
