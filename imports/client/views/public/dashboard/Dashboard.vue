<template>
    <div class="appbar-padding">
        <dashboard-user></dashboard-user>
    </div>
</template>

<script>
    import DashboardUser from "./user/DashboardUser.vue";
    export default {
        components: {
            DashboardUser,
        }
    }
</script>