import {IndexNavigation, Toolbar} from "/imports/client/template";
import Dashboard from '/imports/client/views/public/dashboard/Dashboard.vue';
import BMIHistory from '/imports/client/views/public/dashboard/user/BMIHistory.vue';
import BMIInfo from '/imports/client/views/public/dashboard/user/BMIInfo.vue';
import BPHistory from '/imports/client/views/public/dashboard/user/BPHistory.vue';
import BpInfo from '/imports/client/views/public/dashboard/user/BpInfo.vue';
import GlucoseHistory from '/imports/client/views/public/dashboard/user/GlucoseHistory.vue';
import GlucoseInfo from '/imports/client/views/public/dashboard/user/GlucoseInfo.vue';
import HeartDiseaseHistory from '/imports/client/views/public/dashboard/user/HeartDiseaseHistory.vue';
import HeartDiseaseInfo from '/imports/client/views/public/dashboard/user/HeartDiseaseInfo.vue';
import FitnessPlan from '/imports/client/views/public/dashboard/user/FitnessPlan.vue';
import FitnessPlanDetails from '/imports/client/views/public/dashboard/user/FitnessPlanDetails.vue';
import SelfTreatment from '/imports/client/views/public/dashboard/user/SelfTreatment.vue';
import SelfTreatmentDetails from '/imports/client/views/public/dashboard/user/SelfTreatmentDetails.vue';
import AddSelfTreatment from '/imports/client/views/public/dashboard/admin/AddSelfTreatment.vue';

let routesParent = "/dashboard";
export default [{
    path: `${routesParent}/`,
    name: "Dashboard",
    meta: { fixToolbar: true, pageTitle: "H-Fit" },
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
    path: `${routesParent}/bp-info`,
    name: "BPInfo",
    meta: { fixToolbar: true, pageTitle: "Blood Pressure Info" },
    components: {
        default: BpInfo,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/bmi-info`,
    name: "BMIInfo",
    meta: { fixToolbar: true, pageTitle: "BMI Info" },
    components: {
        default: BMIInfo,
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
    path: `${routesParent}/glucose-info`,
    name: "GlucoseInfo",
    meta: { fixToolbar: true, pageTitle: "Glucose Info" },
    components: {
        default: GlucoseInfo,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/hd-history`,
    name: "HeartDiseaseHistory",
    meta: { fixToolbar: true, pageTitle: "Heart Disease History" },
    components: {
        default: HeartDiseaseHistory,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/hd-info`,
    name: "HeartDiseaseInfo",
    meta: { fixToolbar: true, pageTitle: "Heart Disease Info" },
    components: {
        default: HeartDiseaseInfo,
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
}, {
    path: `${routesParent}/add-treatment`,
    name: "AddSelfTreatment",
    meta: { fixToolbar: true, backIcon: true, depth: 1, pageTitle: "Add Self Treatment" },
    components: {
        default: AddSelfTreatment,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/diet-plan`,
    name: "FitnessPlan",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Diet Plan Trainer" },
    components: {
        default: FitnessPlan,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/diet-plan-details/:id`,
    name: "FitnessPlanDetails",
    meta: { fixToolbar: true, backIcon: true, depth: 0, pageTitle: "Diet Plan Trainer" },
    components: {
        default: FitnessPlanDetails,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},];
