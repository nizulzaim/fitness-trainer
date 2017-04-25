<template>
    <scroll-bar class="flex-fill-height">
        <router-link to="/dashboard" exact>
            <nav-list class="nav-item">
                <icon name="home"></icon> Dashboard
            </nav-list>
        </router-link>
        <router-link to="/dashboard/bmi-history" exact>
            <nav-list class="nav-item">
                <icon name="weight"></icon> Body Mass Index
            </nav-list>
        </router-link>
        <router-link to="/dashboard/bp-history" exact>
            <nav-list class="nav-item">
                <icon name="speedometer"></icon> Blood Pressure
            </nav-list>
        </router-link>
        <router-link to="/dashboard/glucose-history" exact>
            <nav-list class="nav-item">
                <icon name="speedometer"></icon> Glucose Level
            </nav-list>
        </router-link>
        <divider></divider>
        <nav-list class="nav-item" @click="signout">
            <icon name="logout"></icon> Sign Out
        </nav-list>
    </scroll-bar>
</template>

<script>
    import {User} from '/imports/model/User.js';
    export default {
        methods: {
            signout() {
                Meteor.logout(()=> {
                    this.$router.push("/");
                })
            }
        },
        meteor: {
            subscribe: {
                "loginUser": [],
            },
            loginUser() {
                return User.findOne(Meteor.userId());
            }
        }
    }
</script>