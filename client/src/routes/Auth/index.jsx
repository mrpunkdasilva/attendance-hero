/*
* @module routes
*/
import Route from "../Route.js";

/**
 * @name Pages
 */
import Register from "../../pages/Auth/Register/index.jsx";
import Login    from "../../pages/Auth/Login/index.jsx";

/**
 * Represents a collection of routes for the authentication module.
 * Extends the base Route class.
 */
class RoutesAuth extends Route {
    /**
     * An array of route objects. Each object represents a route and contains a path and an element.
     * @type {Array}
     * @property {string} path - The path of the route.
     * @property {React.ReactElement} element - The React component to render for the route.
     */
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
