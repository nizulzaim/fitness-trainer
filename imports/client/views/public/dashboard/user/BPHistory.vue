<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row">
                <latest-blood-pressure :depth="3"></latest-blood-pressure>
                <div class="col-xs-fluid-24"  v-if="othersBP.count()">
                    <div class="font-title">Outdated BMI</div>
                </div>
                <div class="col-xs-fluid-24" v-for="b in othersBP">
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
                                    Systolic :
                                </div>
                                <div class="col-xs">
                                    {{b.systolic}} mmHg
                                </div>
                            </div>
                            <div class="color-white font-light font-subhead no-margin row">
                                <div class="col-xs-fluid-8">
                                    Diastolic :
                                </div>
                                <div class="col-xs">
                                    {{b.diastolic}} mmHg
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
    import {BloodPressure} from "/imports/model/BloodPressure";
    export default {
        meteor: {
            subscribe: {
                myBP: [],
            },
            othersBP() {
                return BloodPressure.find({}, {sort: {createdAt: -1}, skip: 1});
            }
        }
    }
</script>