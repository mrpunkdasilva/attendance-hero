import Route from "../Route";
import Home from "../../components/Home/index.jsx";

/**
 * Represents a collection of guest routes for the application.
 * Extends the base Route class.
 *
 * @class RoutesGuest
 * @extends Route
 */
class RoutesGuest extends Route {
    /**
     * An array of route objects defining the guest routes.
     * Each route object contains a path and an element.
     *
     * @static
     * @memberof RoutesGuest
     * @type {Array}
     */
    static routes = [
        {
            path: "/",
            element: <Home/>,
        }
    ]
}

export default RoutesGuest;