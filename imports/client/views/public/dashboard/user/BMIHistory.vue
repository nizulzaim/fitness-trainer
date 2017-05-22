<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row">
                <div class="col-xs-fluid-24">
                    <cards v-depth="3">
                        <cards-content v-if="!latestBMI">
                            <icon name="emoticon-sad" class="color-grey-300 font-center" style="font-size: 130px; line-height: 140px; height: 140px; width: 100%;"></icon>
                            <div class="font-subhead color-grey-700 font-center no-margin">There are no data about bmi for now. You can add your BMI details.</div>
                        </cards-content>
                        <div @click="latestBMIWeightHeight = !latestBMIWeightHeight">
                            <cards-content v-if="latestBMI" class="background-pink-700" v-ripple>
                                <div class="color-white font-light font-title font-center no-margin">
                                    Latest BMI
                                </div>
                                <div class="color-white font-light font-display4 font-center no-margin">
                                    {{latestBMI.bmi()}}
                                    <!--<span class="color-white font-light font-display1 font-center no-margin">kg/m2</span>-->
                                </div>
                            </cards-content>
                        </div>
                        <cards-content v-if="latestBMI" class="background-pink-800">
                            <div class="color-white font-light font-display1 font-center no-margin">{{latestBMI.description()}}</div>
                        </cards-content>
                        <cards-content v-if="latestBMI && latestBMIWeightHeight">
                            <div class="font-light font-title font-center no-margin">Weight: {{latestBMI.weight}} kg</div>
                            <divider></divider>
                            <div class="font-light font-title font-center no-margin">Height: {{latestBMI.height}} cm</div>
                        </cards-content>
                        <divider></divider>
                        <cards-action class="cards-content">
                            <div class="pull-right">
                                <color-button @click="showAddBmi = true" class="accent" v-ripple><icon name="weight"></icon> Add BMI</color-button>
                            </div>
                        </cards-action>
                    </cards>
                </div>
                <div class="col-xs-fluid-24" v-if="othersBMI.count()">
                    <div class="font-title">Outdated BMI</div>
                </div>
                <div class="col-xs-fluid-24" v-for="b in othersBMI">
                    <cards>
                        <div>
                            <cards-content v-if="b" class="background-grey-700" v-ripple>
                                <div class="color-white font-light font-display2 font-center no-margin">
                                    {{b.bmi()}}
                                    <!--<span class="color-white font-light font-display1 font-center no-margin">kg/m2</span>-->
                                </div>
                            </cards-content>
                        </div>
                        <cards-content v-if="latestBMI" class="background-grey-600">
                            <div class="color-white font-light font-subhead no-margin row">
                                <div class="col-xs-fluid-8">
                                    Description :
                                </div>
                                <div class="col-xs">
                                    {{b.description()}}
                                </div>
                            </div>
                            <div class="color-white font-light font-subhead no-margin row">
                                <div class="col-xs-fluid-8">
                                    Weight :
                                </div>
                                <div class="col-xs">
                                    {{b.weight}} kg
                                </div>
                            </div>
                            <div class="color-white font-light font-subhead no-margin row">
                                <div class="col-xs-fluid-8">
                                    Height :
                                </div>
                                <div class="col-xs">
                                    {{b.height}} cm
                                </div>
                            </div>
                            <div class="color-white font-light font-subhead no-margin row">
                                <div class="col-xs-fluid-8">
                                    Date :
                                </div>
                                <div class="col-xs">
                                    {{ b.localCreatedAt() | moment("dddd, MMMM Do YYYY") }}
                                </div>
                            </div>
                            <div class="color-white font-light font-subhead no-margin row">
                                <div class="col-xs-fluid-8">
                                    Time :
                                </div>
                                <div class="col-xs">
                                    {{ b.localCreatedAt() | moment("h:mm a") }}
                                </div>
                            </div>
                        </cards-content>
                    </cards>
                </div>
            </div>
        </page-container>
        <reveal v-model="showAddBmi">
            <div class="col-md-fluid-10">
                <cards>
                    <cards-content class="background-theme">
                        <div class="color-white font-light font-title font-center no-margin">Add Weight & Height</div>
                        <div class="color-white font-center">We will automatically calculate your BMI using your current weight & height</div>
                    </cards-content>
                    <cards-content-scrollbar>
                        <div class="row has-gutter">
                            <div class="col-xs-fluid-12">
                                <textfield v-model="bmi.weight" placeholder="Weight (kg)"></textfield>
                            </div>
                            <div class="col-xs-fluid-12">
                                <textfield v-model="bmi.height" placeholder="Height (cm)"></textfield>
                            </div>
                        </div>
                    </cards-content-scrollbar>
                    <divider></divider>
                    <cards-action class="cards-content">
                        <div class="pull-right">
                            <color-button @click="addBMI" class="primary" v-ripple>Add BMI</color-button>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </reveal>
        <reveal v-model="showAlert">
            <div class="col-md-fluid-10" v-if="latestBMI">
                <cards>
                    <cards-content class="background-pink-800">
                        <div class="color-white font-light font-title font-center no-margin">BMI Warning</div>
                        <div class="color-white font-regular font-subhead font-center no-margin">You are being suspected to have {{latestBMI.description()}} BMI. We recommend you to meet doctor or go to neareast hospital/clinic.</div>
                    </cards-content>
                    <cards-action class="cards-content">
                        <div class="pull-right">
                            <color-button @click="showAlert = false" class="background-pink-800" v-ripple>OK</color-button>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </reveal>
        <loader ref="loader"></loader>
    </div>
</template>


<script>
    import {User} from "/imports/model/User";
    import {Bmi} from "/imports/model/Bmi";
    export default {
        data() {
            return {
                showUpdateDetails: false,
                showAddBmi: false,
                latestBMIWeightHeight: false,
                user: {
                    name: "",
                    yearOfBirth: "",
                    gender: "",
                },
                possibleYear: [],
                loginUser: null,
                bmi: {
                    weight: "",
                    height: "",
                },
                showAlert: false,
            }
        },
        mounted() {
            for(let i = 1960; i < 2017; i++) {
                this.possibleYear.push(i);
            }
        },
        methods: {
            updateDetails() {
                this.$refs.loader.enable();
                if (this.user.name==="" || this.user.yearOfBirth === "" || this.user.gender === ""){
                    this.$refs.loader.disable();
                    return this.$snackbar.run("Please complete the details before submit");
                }

                this.loginUser.callMethod("update", this.user, (err, result) => {
                    this.$refs.loader.disable();
                    if (err) {
                        return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                    }
                    this.showUpdateDetails = false;
                    return this.$snackbar.run("Successfully update details");
                });
                
            },
            addBMI() {
                this.$refs.loader.enable();
                let b = new Bmi();
                b.callMethod("create", this.bmi, (err, result) => {
                    this.$refs.loader.disable();
                    if (err) {
                        return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                    }
                    setTimeout(()=> {
                        let b = Bmi.findOne(result);
                        if (b.bmi() > 25) {
                            this.showAlert = true;
                        }
                    }, 1000)
                    this.showAddBmi = false;
                    return this.$snackbar.run("Successfully add bmi");
                });
            }
        },
        watch: {
            loginUser(newVal) {
                if (newVal && !newVal.profile.name) {
                    this.showUpdateDetails = true;
                }
            },
        },
        meteor: {
            subscribe: {
                loginUser: [],
                myBmi: [],
            },
            loginUser() {
                return User.findOne({_id: Meteor.userId()});
            },
            latestBMI() {
                return Bmi.findOne({}, {sort: {createdAt: -1}});
            },
            othersBMI() {
                return Bmi.find({}, {sort: {createdAt: -1}, skip: 1});
            }
        }
    }
</script>