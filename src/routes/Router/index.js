import {
  createBrowserRouter,
} from "react-router-dom";

import RoutesGuest from "../Guest";
import Auth from "../Auth/index.jsx";

class Router {
    constructor() {
        this.routesFinal = [];
        this.init();
    }

    init() {
        this.routesFinal = [
            // @group Guest
           ...RoutesGuest.getRoutes(),

            // @group Auth
            ...Auth.getRoutes(),
        ];
    }

    createRouter() {
        return  createBrowserRouter(this.routesFinal);
    }
}

export default Router;