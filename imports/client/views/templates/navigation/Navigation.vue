<template>
    <scroll-bar class="flex-fill-height">
        <router-link to="/dashboard" exact>
            <nav-list class="nav-item">
                <icon name="home"></icon> Dashboard
            </nav-list>
        </router-link>
        <nav-list class="nav-item" :sublist="true" v-if="loginUser && loginUser.isNormal()">
            <icon name="speedometer"></icon> Glucose Level
            <span slot="sublist">
                <router-link to="/dashboard/glucose-info" exact>
                    <nav-list  class="nav-item">
                        <icon name="information"></icon> Info
                    </nav-list>
                </router-link>
                <router-link to="/dashboard/glucose-history" exact>
                    <nav-list class="nav-item">
                        <icon name="calculator"></icon> Self Calculator
                    </nav-list>
                </router-link>
            </span>
        </nav-list>
        <nav-list class="nav-item" :sublist="true" v-if="loginUser && loginUser.isNormal()">
            <icon name="speedometer"></icon> Blood Pressure
            <span slot="sublist">
                <router-link to="/dashboard/bp-info" exact>
                    <nav-list  class="nav-item">
                        <icon name="information"></icon> Info
                    </nav-list>
                </router-link>
                <router-link to="/dashboard/bp-history" exact>
                    <nav-list class="nav-item">
                        <icon name="calculator"></icon> Self Calculator
                    </nav-list>
                </router-link>
            </span>
        </nav-list>
        <nav-list class="nav-item" :sublist="true" v-if="loginUser && loginUser.isNormal()">
            <icon name="speedometer"></icon> Weight Lost
            <span slot="sublist">
                <router-link to="/dashboard/bmi-info" exact>
                    <nav-list  class="nav-item">
                        <icon name="information"></icon> Info
                    </nav-list>
                </router-link>
                <router-link to="/dashboard/bmi-history" exact>
                    <nav-list class="nav-item">
                        <icon name="calculator"></icon> BMI Calculator
                    </nav-list>
                </router-link>
            </span>
        </nav-list>
        <router-link to="/dashboard/add-treatment" exact v-if="loginUser && loginUser.isAdmin()">
            <nav-list class="nav-item">
                <icon name="plus"></icon> Add Self Treatment
            </nav-list>
        </router-link>
        <router-link to="/dashboard/self-treatment" exact v-if="loginUser">
            <nav-list class="nav-item">
                <icon name="hospital"></icon> Self Treatment
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
                    this.$router.replace("/");
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