import Route from "../Route";

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
            element: <h1>Hello</h1>,
        }
    ]
}

export default RoutesGuest;