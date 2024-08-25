/*
* @module routes
*/
import Route from "../Route.js";

/**
 * @name Pages
 */
import Register from "../../Pages/Auth/Register/index.jsx";
import Login from "../../Pages/Auth/Login/index.jsx";


class RoutesAuth extends Route {
    static routes = [
        {
            path: "/register",
            element: <Register/>,
        },
        {
            path: "/login",
            element: <Login/>,
        }
    ];
}

export default RoutesAuth;