<template>
    <div class="col-xs-fluid-24">
        <cards v-depth="depth">
            <cards-content v-if="!latestBP">
                <icon name="emoticon-sad" class="color-grey-300 font-center" style="font-size: 130px; line-height: 140px; height: 140px; width: 100%;"></icon>
                <div class="font-subhead color-grey-700 font-center no-margin">There are no data about your blood pressure for now. You can add your Blood Pressure details.</div>
            </cards-content>
            <div>
                <cards-content v-if="latestBP" :class="color" >
                    <div class="color-white font-light font-title font-center no-margin">
                        Latest Blood Pressure
                    </div>
                    <div class="color-white font-light font-display3 font-center no-margin">
                        {{latestBP.categoryDescription()}}
                    </div>
                    <div class="button-center-container" >
                        <color-button @click="showSuggestion = true" v-ripple class="white">View Suggestion</color-button>
                    </div>
                </cards-content>
            </div>
            <!--<cards-content v-if="latestBP" class="background-pink-800">
                <div class="color-white font-light font-display1 font-center no-margin">{{latestBP.description()}}</div>
            </cards-content>-->
            <cards-content v-if="latestBP">
                <div class="font-light font-title font-center no-margin">Systolic: {{latestBP.systolic}} mmHg</div>
                <divider></divider>
                <div class="font-light font-title font-center no-margin">Diastolic: {{latestBP.diastolic}} mmHg</div>
            </cards-content>
            <divider></divider>
            <cards-action class="cards-content">
                <div class="pull-right">
                    <color-button @click="showAddBP = true" class="accent" v-ripple><icon name="speedometer"></icon> Add Blood Pressure</color-button>
                </div>
            </cards-action>
        </cards>

        <reveal v-model="showAddBP">
            <div class="col-md-fluid-10">
                <cards>
                    <cards-content class="background-theme">
                        <div class="color-white font-light font-title font-center no-margin">Add Top & Bottom number</div>
                        <div class="color-white font-center">We will automatically calculate your blood pressure class using Top number (systolic) and  Bottom number (diastolic) in mm Hg</div>
                    </cards-content>
                    <cards-content-scrollbar>
                        <div class="row has-gutter">
                            <div class="col-xs-fluid-12">
                                <textfield v-model="bp.systolic" placeholder="Top (mm Hg)"></textfield>
                            </div>
                            <div class="col-xs-fluid-12">
                                <textfield v-model="bp.diastolic" placeholder="Bottom (mm Hg)"></textfield>
                            </div>
                            <div class="col-xs-fluid-24">
                                <list class="hover" :dense="true" v-if="showOptions">
                                    <list-item v-for="(opt, index) in options" v-on:click="options[index].option = !options[index].option">
                                        <span slot="left">
                                            <checkbox v-model="options[index].option"></checkbox>
                                        </span>
                                       {{opt.name}}
                                    </list-item>
                                </list>
                            </div>
                        </div>
                    </cards-content-scrollbar>
                    <divider></divider>
                    <cards-action class="cards-content">
                        <div class="pull-right">
                            <color-button @click="save" class="primary" v-ripple>Add Data</color-button>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </reveal>
        <reveal v-model="showSuggestion">
            <div class="col-md-fluid-10" v-if="latestBP">
                <cards>
                    <cards-content class="background-theme">
                        <div class="color-white font-light font-title font-center no-margin">Nutrition & Exercises</div>
                        <div class="color-white font-regular font-subhead font-center no-margin">for {{latestBP.categoryDescription()}}</div>
                    </cards-content>
                    <cards-content-scrollbar>
                        <div style="margin: -8px -12px">
                            <list class="hover" :dense="true">
                                <div class="font-caption no-margin font-medium" style="padding: 12px 16px">Nutritions</div>
                                <list-item v-for="(n, index) in latestBP.nutritionLists()">
                                    <div slot="left">
                                        <icon name="food" class="color-pink"></icon>
                                    </div>
                                    {{n}}
                                </list-item>
                            </list>

                            <list class="hover" :dense="true">
                                <div class="font-caption no-margin font-medium" style="padding: 12px 16px">Exercises</div>
                                <list-item v-for="(n, index) in latestBP.exerciseLists()">
                                    <div slot="left">
                                        <icon name="run" class="color-indigo"></icon>
                                    </div>
                                    {{n}}
                                </list-item>
                            </list>
                        </div>
                    </cards-content-scrollbar>
                    <divider></divider>
                    <cards-action class="cards-content">
                        <div class="pull-right">
                            <color-button @click="showSuggestion = false" class="primary" v-ripple>OK</color-button>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </reveal>
    </div>
</template>

<script>
    import {User} from "/imports/model/User";
    import {BloodPressure} from "/imports/model/BloodPressure";
    export default {
        props: {
            depth: {
                type: Number,
                default: 1,
            },
        },
        data() {
            return {
                loginUser: null,
                showAddBP: false,
                latestShowDetails: false,
                showSuggestion: false,
                bp: {
                    systolic: "",
                    diastolic: "",
                    condition: [],
                },
                options: [
                    {name: "Blurred/double vision", option: false},
                    {name: "Constant headache", option: false},
                    {name: "Nosebleeds", option: false},
                    {name: "Shortness of breath", option: false},
                    {name: "Diabetes", option: false},
                    {name: "Hormonal condition", option: false},
                    {name: "Kidney disease", option: false},
                    {name: "Certain painkillers", option: false},
                ]
            }
        },
        computed:{
            color() {
                if (this.latestBP) {
                    return {
                        "background-indigo-700": this.latestBP.category() === 0, 
                        "background-green-700": this.latestBP.category() === 1, 
                        "background-amber-700": this.latestBP.category() === 2,
                        "background-deep-orange-700": this.latestBP.category() === 3,
                        "background-red-700": this.latestBP.category() === 4,
                        "background-deep-purple-800": this.latestBP.category() === 5,
                    }
                }
                return {};
            },
            showOptions(){
                if (parseFloat(this.bp.systolic) >= 120 && parseFloat(this.bp.diastolic) >= 80) {
                    return true;
                }

                return false;
            }
        },
        methods: {
            save() {
                let b = new BloodPressure();
                this.options.forEach((item, index)=> {
                    if (item.option) {
                        this.bp.condition.push(index);
                    }
                });

                b.callMethod("create", this.bp, (err, result) => {
                    if (err) {
                        return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                    }
                    this.showAddBP = false;
                    return this.$snackbar.run("Successfully add data");
                });
            },
        },
        meteor: {
            subscribe: {
                loginUser: [],
                latestBP: [],
            },
            loginUser() {
                return User.findOne({_id: Meteor.userId()});
            },
            latestBP() {
                return BloodPressure.findOne({}, {sort: {createdAt: -1}});
            }
        }
    }
</script>