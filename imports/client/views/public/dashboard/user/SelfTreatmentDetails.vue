<template>
    <div>
        <slider @finished="nextAction" @slideChange="changeTitle" v-wheight class="background-theme" :has-next-button="true" v-if="thisData">
            <slider-item class="appbar-padding">
                <scroll-bar>
                    <div class="font-display1 color-white">
                        <img v-if="thisData.getImageLink()" :src="thisData.getImageLink()" class="img-responsive" v-depth="2">
                        <div class="font-title font-light color-white font-center" style="padding: 20px;">
                            {{thisData.info}} 
                            
                        </div>
                        <div class="button-center-container">
                            <icon-button v-if="loginUser && loginUser.isAdmin()" name="delete" @click="deleteThis(thisData)" v-ripple></icon-button>
                        </div>
                    </div>
                </scroll-bar>
            </slider-item>
            <slider-item class="appbar-padding">
                <scroll-bar>
                    <div class="font-display1 color-white">
                        <list class="hover">
                            <list-item v-for="d in thisData.sympthom">
                                <span slot="left">
                                    <icon name="hexagon-multiple" style="color:orange"></icon>
                                </span> <span v-html="d"></span>
                            </list-item>
                        </list>
                    </div>
                </scroll-bar>
            </slider-item>
            <slider-item class="appbar-padding">
                <scroll-bar>
                    <div class="font-display1 color-white">
                        <list class="hover">
                            <list-item v-for="d in thisData.firstAid">
                                <span slot="left">
                                    <icon name="hexagon-multiple" style="color:orange"></icon>
                                </span> <span v-html="d"></span>
                            </list-item>
                        </list>
                    </div>
                </scroll-bar>
            </slider-item>
            <slider-item class="appbar-padding" v-if="thisData.prevention.length">
                <scroll-bar>
                    <div class="font-display1 color-white">
                        <list class="hover">
                            <list-item v-for="d in thisData.prevention">
                                <span slot="left">
                                    <icon name="hexagon-multiple" style="color:orange"></icon>
                                </span> <span v-html="d"></span>
                            </list-item>
                        </list>
                    </div>
                </scroll-bar>
            </slider-item>
        </slider>
    </div>

</template>

<script>
    import {Treatment} from '/imports/model/Treatment.js';
    import {User} from '/imports/model/User.js';
    export default {
        methods: {
            nextAction() {
                this.$router.replace("/dashboard/self-treatment");
            },
            changeTitle(v) {
                if (v === 0) {
                    this.$route.meta.pageTitle = "What is " + this.thisData.title + "?";
                } else if(v === 1){
                    this.$route.meta.pageTitle = this.thisData.title + "'s Sympthom"
                } else if(v === 2){
                    this.$route.meta.pageTitle = this.thisData.title + "'s First Aid";
                } else if(v === 3){
                    this.$route.meta.pageTitle = this.thisData.title + "'s Prevention";
                }
                Session.set("titleChangeHappen",this.$route.meta.pageTitle);
            },
            deleteThis(obj) {
                this.$confirmation.run("Are you sure you want to delete?", ()=> {
                    obj.callMethod("removeItem", (err, reason)=> {
                        if (err) {
                            return this.$snackbar.run("Error trying to delete");
                        }
                        this.nextAction();
                        return this.$snackbar.run("Successfully delete treatments");
                    });
                })
            }
        },
        meteor: {
            subscribe: {
                treatments: [],
                loginUser: [],
            },
            thisData() {
                let thisData = Treatment.findOne(this.$route.params.id);
                if (thisData) {
                    this.$route.meta.pageTitle = "What is " + thisData.title + "?";
                    Session.set("titleChangeHappen",this.$route.meta.pageTitle);
                }
                return thisData;
            },
            loginUser() {
                return User.findOne(Meteor.userId());
            }
        }
    }
</script>