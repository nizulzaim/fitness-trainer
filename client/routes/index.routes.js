import {IndexNavigation, Toolbar} from "/imports/client/template";
import IndexPage from '/imports/client/views/public/Index.vue';
import Login from '/imports/client/views/public/Login.vue';
import Register from '/imports/client/views/public/Register.vue';

let routesParent = "";
export default [{
    path: `${routesParent}/`,
    name: "Index",
    meta: { fixToolbar: true, pageTitle: "Fitness Trainer" },
    components: {
        default: IndexPage,
    }
}, {
    path: `${routesParent}/login`,
    name: "Login",
    meta: { fixToolbar: true, pageTitle: "Fitness Trainer" },
    components: {
        default: Login,
    }
},{
    path: `${routesParent}/register`,
    name: "Register",
    meta: { fixToolbar: true, pageTitle: "Fitness Trainer" },
    components: {
        default: Register,
    }
},];
