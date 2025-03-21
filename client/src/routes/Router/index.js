import RoutesGuest from "../Guest/index.jsx";
import Auth from "../Auth/index.jsx";
import {createBrowserRouter} from "react-router-dom";

/**
 * Router class for managing application routes.
 *
 * @class Router
 */
class Router {
    /**
     * Constructs a new instance of Router.
     */
    constructor() {
        /**
         * Array to store final routes.
         *
         * @type {Array}
         */
        this.routesFinal = [];

        // Initialize routes
        this.init();
    }

    /**
     * Initializes routes by merging guest and auth routes.
     */
    init() {
        this.routesFinal = [
            // @group Guest
            ...RoutesGuest.getRoutes(),

            // @group Auth
            ...Auth.getRoutes(),
        ];
    }

    /**
     * Creates a browser router with the final routes.
     *
     * @returns {Object} A browser router instance.
     */
    createRouter() {
        return  createBrowserRouter(this.routesFinal);
    }
}

export default Router;