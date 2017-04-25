import {IndexNavigation, Toolbar} from "/imports/client/template";
import Dashboard from '/imports/client/views/public/dashboard/Dashboard.vue';
import BMIHistory from '/imports/client/views/public/dashboard/user/BMIHistory.vue';
import BPHistory from '/imports/client/views/public/dashboard/user/BPHistory.vue';
import GlucoseHistory from '/imports/client/views/public/dashboard/user/GlucoseHistory.vue';
import SelfTreatment from '/imports/client/views/public/dashboard/user/SelfTreatment.vue';
import SelfTreatmentDetails from '/imports/client/views/public/dashboard/user/SelfTreatmentDetails.vue';

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
    name: "GlucoseHistory",
    meta: { fixToolbar: true, pageTitle: "Glucose Level" },
    components: {
        default: GlucoseHistory,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/self-treatment`,
    name: "SelfTreatment",
    meta: { fixToolbar: true,searchIcon: true, pageTitle: "Self Treatment" },
    components: {
        default: SelfTreatment,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
}, {
    path: `${routesParent}/self-treatment/:id`,
    name: "SelfTreatmentDetails",
    meta: { fixToolbar: true, backIcon: true, depth: 0, pageTitle: "Self Treatment" },
    components: {
        default: SelfTreatmentDetails,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},];
