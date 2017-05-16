<template>
    <div class="col-xs-fluid-24">
        <cards v-depth="depth">
            <cards-content v-if="!latestG">
                <icon name="emoticon-sad" class="color-grey-300 font-center" style="font-size: 130px; line-height: 140px; height: 140px; width: 100%;"></icon>
                <div class="font-subhead color-grey-700 font-center no-margin">There are no data about your glucose level for now. You can add your Glucose Level details.</div>
            </cards-content>
            <div>
                <cards-content v-if="latestG" :class="color" >
                    <div class="color-white font-light font-title font-center no-margin">
                        Latest Glucose Level
                    </div>
                    <div class="color-white font-light font-display3 font-center no-margin">
                        {{latestG.categoryDescription()}}
                    </div>
                    <div class="button-center-container" >
                        <color-button @click="showSuggestion = true" v-ripple class="white">View Suggestion</color-button>
                    </div>
                </cards-content>
            </div>
            <!--<cards-content v-if="latestBP" class="background-pink-800">
                <div class="color-white font-light font-display1 font-center no-margin">{{latestBP.description()}}</div>
            </cards-content>-->
            <cards-content v-if="latestG">
                <div class="font-light font-subhead font-center no-margin">Glucose (Mg/dL): {{latestG.value.toFixed(2)}} Mg/dL</div>
                <divider></divider>
                <div class="font-light font-subhead font-center no-margin">Glucose (Mmol/L): {{latestG.mmolValue().toFixed(1)}} Mmol/L</div>
            </cards-content>
            <divider></divider>
            <cards-action class="cards-content">
                <div class="pull-right">
                    <color-button @click="showAddG = true" class="accent" v-ripple><icon name="speedometer"></icon> Add Glucose Level</color-button>
                </div>
            </cards-action>
        </cards>

        <reveal v-model="showAddG">
            <div class="col-md-fluid-10">
                <cards>
                    <cards-content class="background-theme">
                        <div class="color-white font-light font-title font-center no-margin">Add Glucose Level</div>
                        <div class="color-white font-center">We will automatically calculate if you have diabetes using your glucose level</div>
                    </cards-content>
                    <cards-content-scrollbar>
                        <div class="row has-gutter">
                            <div class="col-xs-fluid-7">
                                <dropdown-select v-model="g.unit" label="Unit">
                                    <menu-option :value="0">Mg/dL</menu-option>
                                    <menu-option :value="1">Mmol/L</menu-option>
                                </dropdown-select>
                            </div>
                            <div class="col-xs">
                                <textfield v-model="g.value" :placeholder="unitLabel"></textfield>
                            </div>
                            <div class="col-xs-fluid-24">
                                <div class="font-subhead" style="margin-top: 20px;" v-if="showOptions">Please √ the information below</div>
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
            <div class="col-md-fluid-10" v-if="latestG">
                <cards>
                    <cards-content class="background-theme">
                        <div class="color-white font-light font-title font-center no-margin">Nutrition & Exercises</div>
                        <div class="color-white font-regular font-subhead font-center no-margin">for {{latestG.categoryDescription()}}</div>
                    </cards-content>
                    <cards-content-scrollbar>
                        <div style="margin: -8px -12px">
                            <list class="hover" :dense="true">
                                <div class="font-caption no-margin font-medium" style="padding: 12px 16px">Nutritions</div>
                                <list-item v-for="(n, index) in latestG.nutritionLists()">
                                    <div slot="left">
                                        <icon name="food" class="color-pink"></icon>
                                    </div>
                                    {{n}}
                                </list-item>
                            </list>

                            <list class="hover" :dense="true">
                                <div class="font-caption no-margin font-medium" style="padding: 12px 16px">Exercises</div>
                                <list-item v-for="(n, index) in latestG.exerciseLists()">
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
    import {Glucose} from "/imports/model/Glucose";
    export default {
        props: {
            depth: {
                type: Number,
                default: 1,
            },
        },
        data() {
            return {
                showAddG: false,
                latestShowDetails: false,
                showSuggestion: false,
                g: {
                    value: "",
                    unit: 0,
                    condition: [],
                },
                options: [
                    {name: "Above average thirst", option: false},
                    {name: "Tiredness during the day", option: false},
                    {name: "Needing to pee regularly", option: false},
                    {name: "Unexplained weight loss", option: false},
                    {name: "Have you ever been told you had diabetes or a problem with blood pressure", option: false},
                    {name: "Has anyone in your immediate family (mother, father, sister, brother) had diabetes?", option: false},
                    {name: "Waist size greater than 35 inches (88 cm)", option: false},
                ] 
            }
        },
        computed:{
            color() {
                if (this.latestG) {
                    return {
                        "background-green-700": this.latestG.category() === 0, 
                        "background-amber-700": this.latestG.category() === 1, 
                        "background-red-700": this.latestG.category() === 2,
                    }
                }
                return {};
            },
            showOptions(){
                if (this.g.unit === 0 && parseFloat(this.g.value) >= 126) {
                    return true;
                }

                if (this.g.unit === 1 && parseFloat(this.g.value) >= 7) {
                    return true;
                }

                return false;
            },
            unitLabel() {
                if (this.g.unit === 0) {
                    return "Glucose Level (Mg/dL)";
                }

                return "Glucose Level (Mmol/L)";
            }
        },
        methods: {
            save() {
                let g = new Glucose();
                this.options.forEach((item, index)=> {
                    if (item.option) {
                        this.g.condition.push(index);
                    }
                });

                g.callMethod("create", this.g, (err, result) => {
                    if (err) {
                        return this.$snackbar.run(err.reason, () => {}, "OK", "error");
                    }
                    this.showAddG = false;
                    return this.$snackbar.run("Successfully add data");
                });
            },
        },
        meteor: {
            subscribe: {
                latestGlucose: [],
            },
            latestG() {
                return Glucose.findOne({}, {sort: {createdAt: -1}});
            }
        }
    }
</script>