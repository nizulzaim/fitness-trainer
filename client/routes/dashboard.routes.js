import {IndexNavigation, Toolbar} from "/imports/client/template";
import Dashboard from '/imports/client/views/public/dashboard/Dashboard.vue';
import BMIHistory from '/imports/client/views/public/dashboard/user/BMIHistory.vue';
import BPHistory from '/imports/client/views/public/dashboard/user/BPHistory.vue';
import GlucoseHistory from '/imports/client/views/public/dashboard/user/GlucoseHistory.vue';

let routesParent = "/dashboard";
export default [{
    path: `${routesParent}/`,
    name: "Dashboard",
    meta: { fixToolbar: true, pageTitle: "Fitness Trainer" },
    components: {
        default: Dashboard,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/bmi-history`,
    name: "BMIHistory",
    meta: { fixToolbar: true, pageTitle: "BMI History" },
    components: {
        default: BMIHistory,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/bp-history`,
    name: "BPHistory",
    meta: { fixToolbar: true, pageTitle: "Blood Pressure" },
    components: {
        default: BPHistory,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/glucose-history`,
    name: "BPHistory",
    meta: { fixToolbar: true, pageTitle: "Glucose Level" },
    components: {
        default: GlucoseHistory,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},];
