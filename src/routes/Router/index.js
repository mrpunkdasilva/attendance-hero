import {
  createBrowserRouter,
} from "react-router-dom";

import RoutesGuest from "../Guest";
import Auth from "../Auth/index.jsx";

class Router {
    constructor() {
        this.routesFinall = [];
        this.init();
    }

    init() {
        this.routesFinall = [
            // @group Guest
           ...RoutesGuest.getRoutes(),

            // @group Auth
            ...Auth.getRoutes(),
        ];
    }

    createRouter() {
        return  createBrowserRouter(this.routesFinall);
    }
}

export default Router;