<template>
    <div>
        <page-container>
            <div class="row">
                <div class="col-xs-fluid-24">
                    <cards >
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
                <latest-blood-pressure></latest-blood-pressure>
                <latest-glucose></latest-glucose>
                <latest-heart-disease></latest-heart-disease>
            </div>
        </page-container>
        <reveal v-model="showUpdateDetails" :enable-overlay-click="false">
            <div class="col-md-fluid-10">
                <cards>
                    <cards-content class="background-theme">
                        <div class="color-white font-light font-title">Welcome User!</div>
                        <div class="color-white">Hi, Looks like you are new here. There are some details that we need to know before you can use this system</div>
                    </cards-content>
                    <cards-content-scrollbar>
                        <div class="row has-gutter">
                            <div class="col-xs-fluid-24">
                                <textfield v-model="user.name" placeholder="Fullname"></textfield>
                            </div>
                            <div class="col-xs-fluid-12">
                                <dropdown-select v-model="user.yearOfBirth" label="Year">
                                    <menu-option v-for="t in possibleYear" :value="t">{{t}}</menu-option>
                                </dropdown-select>
                            </div>
                            <div class="col-xs-fluid-12">
                                <dropdown-select v-model="user.gender" label="Gender">
                                    <menu-option :value="0">Male</menu-option>
                                    <menu-option :value="1">Female</menu-option>
                                </dropdown-select>
                            </div>
                        </div>
                    </cards-content-scrollbar>
                    <divider></divider>
                    <cards-action class="cards-content">
                        <div class="pull-right">
                            <color-button @click="updateDetails" class="primary" v-ripple>Update</color-button>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </reveal>
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
            
            for(let i = 2016; i >= 1960; i--) {
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
            }
        }
    }
</script>