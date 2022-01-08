import Router from "vue-router";

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "FuelStations",
            component: () => import("./components/FuelStations"),
        },
        {
            path: "/fuelStations",
            name: "FuelStations",
            component: () => import("./components/FuelStations"),
        },
        {
            path: "/fuelStation/:orgId",
            name: "FuelStation",
            component: () => import("./components/FuelStation"),
        }
    ]
});

export default router;