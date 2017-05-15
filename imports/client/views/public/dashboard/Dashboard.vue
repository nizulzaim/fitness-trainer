<template>
    <div class="appbar-padding">
        <dashboard-user v-if="loginUser && loginUser.isNormal()"></dashboard-user>
        <dashboard-admin v-if="loginUser && loginUser.isAdmin()"></dashboard-admin>
    </div>
</template>

<script>
    import DashboardUser from "./user/DashboardUser.vue";
    import DashboardAdmin from "./admin/DashboardAdmin.vue";

    import {User} from '/imports/model/User.js';
    export default {
        components: {
            DashboardUser,
            DashboardAdmin,
        },
        meteor: {
            subscribe: {
                loginUser: [],
            },
            loginUser() {
                return User.findOne(Meteor.userId());
            }
        }
    }
</script>