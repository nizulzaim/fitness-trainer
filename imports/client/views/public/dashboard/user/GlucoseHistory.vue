<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row">
                <latest-glucose :depth="3"></latest-glucose>
                <div class="col-xs-fluid-24">
                    <div class="font-title">Outdated Glucose Level</div>
                </div>
                <div class="col-xs-fluid-24" v-for="b in othersG">
                    <cards>
                        <div>
                            <cards-content class="background-grey-700" v-ripple>
                                <div class="color-white font-light font-headline font-center no-margin">
                                    {{b.categoryDescription()}}
                                    <!--<span class="color-white font-light font-display1 font-center no-margin">kg/m2</span>-->
                                </div>
                            </cards-content>
                        </div>
                        <cards-content class="background-grey-600">
                            <div class="color-white font-light font-subhead no-margin row">
                                <div class="col-xs-fluid-8">
                                    Mg/dL :
                                </div>
                                <div class="col-xs">
                                    {{b.value.toFixed(2)}} Mg/dL
                                </div>
                            </div>
                            <div class="color-white font-light font-subhead no-margin row">
                                <div class="col-xs-fluid-8">
                                    Mmol/L :
                                </div>
                                <div class="col-xs">
                                    {{b.mmolValue().toFixed(2)}} mmHg
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
    </div>
</template>


<script>
    import {User} from "/imports/model/User";
    import {Glucose} from "/imports/model/Glucose";
    export default {
        meteor: {
            subscribe: {
                myGlucose: [],
            },
            othersG() {
                return Glucose.find({}, {sort: {createdAt: -1}, skip: 1});
            }
        }
    }
</script>