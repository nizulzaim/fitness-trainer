<template>
    <div>
        <slider @finished="nextAction" @slideChange="changeTitle" v-wheight class="background-theme" :has-next-button="true" v-if="thisData">
            <slider-item class="appbar-padding">
                <scroll-bar>
                    <div class="font-display1 color-white">
                        <img :src="thisData.image" class="img-responsive" v-depth="2">
                        <div class="font-title font-light color-white font-center" style="padding: 20px;">
                            {{thisData.info}} 
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
            <slider-item class="appbar-padding" v-if="thisData.prevention">
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
    import {DataById} from "/imports/client/dummyData";
    export default {
        data() {
            return {
                thisData: DataById(parseInt(this.$route.params.id)),
            }
        },
        mounted() {
            this.$route.meta.pageTitle = "What is " + this.thisData.title + "?";
            Session.set("titleChangeHappen",this.$route.meta.pageTitle);
        },
        methods: {
            nextAction() {
                this.$snackbar.run("You can redirect to other page here");
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
            }
        }
    }
</script>