<template>
    <div class="col-xs-fluid-24">
        <cards v-depth="depth">
            <cards-content v-if="!latestHD">
                <icon name="emoticon-sad" class="color-grey-300 font-center" style="font-size: 130px; line-height: 140px; height: 140px; width: 100%;"></icon>
                <div class="font-subhead color-grey-700 font-center no-margin">There are no data about your heart disease. Answer Question for heart disease level diagnostic</div>
            </cards-content>
            <div>
                <cards-content v-if="latestHD" :class="color" >
                    <div class="color-white font-light font-title font-center no-margin">
                        Latest Heart Disease
                    </div>
                    <div class="color-white font-light font-display3 font-center no-margin">
                        {{latestHD.categoryDescription()}}
                    </div>
                    <div class="button-center-container" >
                        <color-button @click="showSuggestion = true" v-ripple class="white">View Suggestion</color-button>
                    </div>
                </cards-content>
            </div>
            <divider></divider>
            <cards-action class="cards-content">
                <div class="pull-right">
                    <color-button @click="showAddHD = true" class="accent" v-ripple><icon name="speedometer"></icon> Heart Disease diagnosis</color-button>
                </div>
            </cards-action>
        </cards>

        <reveal v-model="showAddHD">
            <div class="col-md-fluid-10">
                <cards>
                    <cards-content class="background-theme">
                        <div class="color-white font-light font-title font-center no-margin">Diagnosis Heart Disease</div>
                        <div class="color-white font-center">We will automatically calculate if you have diabetes using your glucose level</div>
                    </cards-content>
                    <cards-content-scrollbar>
                        <div class="row has-gutter">
                            <div class="col-xs-fluid-24" v-for="(opt, index) in options">
                                <div class="font-subhead" style="margin-top: 20px;">{{opt.name}}</div>
                                <list class="hover" :dense="true" style="margin: 0 -12px;">
                                    <list-item v-for="(o, i) in opt.option" @click="opt.result = opt.option[i].value">
                                        <span slot="left">
                                            <radio v-model="opt.result" :val="opt.option[i].value" :name="'radioData' + index"></radio>
                                        </span>
                                       {{o.text}}
                                    </list-item>
                                </list>
                            </div>
                        </div>
                    </cards-content-scrollbar>
                    <divider></divider>
                    <cards-action class="cards-content">
                        <div class="pull-right">
                            <color-button @click="save" class="primary" v-ripple>Confirm</color-button>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </reveal>
        <reveal v-model="showSuggestion">
            <div class="col-md-fluid-10" v-if="latestHD">
                <cards>
                    <cards-content class="background-theme">
                        <div class="color-white font-light font-title font-center no-margin">Nutrition & Exercises</div>
                        <div class="color-white font-regular font-subhead font-center no-margin">for {{latestHD.categoryDescription()}}</div>
                    </cards-content>
                    <cards-content-scrollbar>
                        <div style="margin: -8px -12px">
                            <list class="hover" :dense="true">
                                <div class="font-caption no-margin font-medium" style="padding: 12px 16px">Nutritions</div>
                                <list-item v-for="(n, index) in latestHD.nutritionLists()">
                                    <div slot="left">
                                        <icon name="food" class="color-pink"></icon>
                                    </div>
                                    {{n}}
                                </list-item>
                            </list>

                            <list class="hover" :dense="true">
                                <div class="font-caption no-margin font-medium" style="padding: 12px 16px">Exercises</div>
                                <list-item v-for="(n, index) in latestHD.exerciseLists()">
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

        <reveal v-model="showAlert">
            <div class="col-md-fluid-10" v-if="latestHD">
                <cards>
                    <cards-content :class="color">
                        <div class="color-white font-light font-title font-center no-margin">Heart Disease Warning</div>
                        <div class="color-white font-regular font-subhead font-center no-margin">You are {{latestHD.categoryDescription()}} to have heart disease. We recommend you to meet doctor or go to neareast hospital/clinic.</div>
                    </cards-content>
                    <cards-action class="cards-content">
                        <div class="pull-right">
                            <color-button @click="showAlert = false" :class="color" v-ripple>OK</color-button>
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
    import {HeartDisease} from "/imports/model/HeartDisease";
    export default {
        props: {
            depth: {
                type: Number,
                default: 1,
            },
        },
        data() {
            return {
                showAddHD: false,
                latestShowDetails: false,
                showSuggestion: false,
                showAlert: false,
                hd: {
                    value: "",
                    unit: 0,
                    condition: [],
                },
                options: [
                    {name: "Have you ever had a heart attack or been told that you have heart disease?", result: false, option: [{value: true, text: "Yes"}, {value: false, text: "No"}]},
                    {name: "Have you ever been told that you have high blood pressure (hypertension) or have you ever been given blood pressure medication?", result: false, option: [{value: true, text: "Yes"}, {value: false, text: "No"}]},
                    {name: "Have you ever been told you had diabetes or a problem with high blood sugar?", result: false, option: [{value: true, text: "Yes"}, {value: false, text: "No"}]},
                    {name: "Have you ever been told that your total cholesterol level is high?", result: false, option: [{value: true, text: "Yes"}, {value: false, text: "No"}]},
                    {name: "What is your total cholesterol level?", result: 0, option: [
                        {value: 0, text: "159 or lower"}, 
                        {value: 1, text: "160-199"},
                        {value: 2, text: "200-239"},
                        {value: 3, text: "240-279"},
                        {value: 4, text: "280 or higher"},
                        {value: 5, text: "Don't know"}
                    ]},
                    {name: "What is your HDL cholesterol?", result: 0, option: [
                        {value: 0, text: "39 or lower"}, 
                        {value: 1, text: "40 or higher"},
                        {value: 2, text: "Don't know"}
                    ]},
                    {name: "Have you smoked at least 100 cigarettes?", result: false, option: [{value: true, text: "Yes"}, {value: false, text: "No"}]},
                    {name: "Do you walk (or do other moderate activity) for at least 30 minutes on most days, or at least 3 hours per week?", result: false, option: [{value: true, text: "Yes"}, {value: false, text: "No"}]},
                    {name: "Has anyone in your immediate family (mother, father, sister, brother) had a heart attack?", result: false, option: [{value: true, text: "Yes"}, {value: false, text: "No"}]},
                ] 
            }
        },
        computed:{
            color() {
                if (this.latestHD) {
                    return {
                        "background-green-700": this.latestHD.category() === 0, 
                        "background-amber-700": this.latestHD.category() === 1, 
                        "background-red-700": this.latestHD.category() === 2,
                    }
                }
                return {};
            },
        },
        methods: {
            save() {
                this.$refs.loader.enable();
                let hd = new HeartDisease();
                let array = [
                    this.options[0].result,
                    this.options[1].result,
                    this.options[2].result,
                    this.options[3].result,
                    this.options[6].result,
                    this.options[7].result,
                    this.options[8].result,
                ]

                hd.callMethod("create", array, (err, result) => {
                    this.$refs.loader.disable();
                    if (err) {
                        return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                    }

                    setTimeout(()=> {
                        let hd = HeartDisease.findOne(result);
                        if (hd.category() >= 2) {
                            this.showAlert = true;
                        }
                    }, 1000)
                    this.showAddHD = false;
                    return this.$snackbar.run("Successfully add data");
                });
            },
        },
        meteor: {
            subscribe: {
                latestHeartDisease: [],
            },
            latestHD() {
                return HeartDisease.findOne({}, {sort: {createdAt: -1}});
            }
        }
    }
</script>