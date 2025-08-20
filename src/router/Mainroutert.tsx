import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import Layout from "../Layout";
import ProtectedRoutes from "../components/ProtectedRoutes";
import PageNotFound from "../pages/PageNotFound";
import AddService from "../pages/AddService";
import ListService from "../pages/ListService";
import ListPlan from "../pages/ListPlan";
import AddHardwareProduct from "../pages/AddHardwareProduct";
// import ProtectedRoutes from "../components/ProtectedRoutes";


export const MainRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<ProtectedRoutes><App/></ProtectedRoutes>} />
                <Route path = "/add-service" element = {<ProtectedRoutes> <AddService/></ProtectedRoutes>}/>
                <Route path = "/list-service" element = {<ProtectedRoutes><ListService/></ProtectedRoutes>}/>
                <Route path="/list-plans" element = {<ProtectedRoutes><ListPlan/></ProtectedRoutes>}/>
                <Route path = "/add-product" element = {<ProtectedRoutes><AddHardwareProduct/></ProtectedRoutes>}/>
                <Route path="*" element = {<ProtectedRoutes><PageNotFound/></ProtectedRoutes>}/>
                {/* <Route element = {<ProtectedRoutes/>}>
                    <Route path = "/dashboard" element = {<App/>}/>
                    <Route path = "*" element = {<PageNotFound/>}/>
                </Route> */}

            </Route>
            <Route path="/login" element={<LoginPage />} />
        </Route>
    )
)