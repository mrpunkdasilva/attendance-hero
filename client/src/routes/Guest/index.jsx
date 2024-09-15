import Route from "../Route";

class RoutesGuest extends Route {
    static routes = [
        {
            path: "/",
            element: <h1>Hello</h1>,
        }
    ]
}

export default RoutesGuest;