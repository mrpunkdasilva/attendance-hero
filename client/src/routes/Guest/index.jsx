import Route from "../Route";
import Home from "../../components/Home/index.jsx";
import Stats from "../../pages/Stats/index.jsx";
import Protocols from "../../pages/Protocols/index.jsx";
import PrivateRoute from "../PrivateRoute.jsx";

class RoutesGuest extends Route {
    static routes = [
        {
            element: <PrivateRoute />,
            children: [
                {
                    path: "/",
                    element: <Home/>,
                },
                {
                    path: "/stats",
                    element: <Stats/>,
                },
                {
                    path: "/protocols",
                    element: <Protocols/>,
                },
            ],
        },
    ]
}

export default RoutesGuest;
