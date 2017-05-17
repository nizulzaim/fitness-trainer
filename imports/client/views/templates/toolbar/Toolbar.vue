<template>
    <span>
        <app-bar :title="title" :fixed="true" background-color="theme" v-depth="depth">
            <div slot="left">
                <icon-button v-show="!backIcon" name="menu" v-open v-ripple="{background: '#fff'}"></icon-button>
                <icon-button v-show="backIcon" name="arrow-left" @click="backOne" v-ripple="{background: '#fff'}"></icon-button>
            </div>
            <div slot="center" v-if="searchIcon">
                <search-box v-model="value"></search-box>
            </div>
        </app-bar>
        <reveal v-model="showMessage">
            <div class="col-md-fluid-10">
                <cards>
                    <cards-content class="background-theme">
                        <div class="color-white font-light font-title font-center no-margin">About H-Fit</div>
                    </cards-content>
                    <cards-content-scrollbar>
                        <div class="color-grey-900" style="text-align:justify">
                            Personalize and Customize Health and Fitness Application (mobile application) which is all in one application that seeks to motivate sedentary adults to become active and maintain a healthy lifestyle. This application, user can choose three popular disease and will show the information that user need to follow based on result. For example, user chose ‘Glucose Level’ then user need to calculate the blood sugar they have. After that, the application will show the nutrition that they should take and the type of exercise for decrease their blood pressure. This interactive tool will provide you with a realistic meal and fitness plan to reach your goals based on your individual needs. 
                        </div>
                    </cards-content-scrollbar>
                    <divider></divider>
                    <cards-action class="cards-content">
                        <div class="pull-right">
                            <flat-button @click="showMessage = false" class="primary" v-ripple>Ok</flat-button>
                        </div>
                    </cards-action>
                </cards>
            </div>
        </reveal>
    </span>
</template>

<script>
export default {
    data() {
        return {
            value: "",
            title: "",
            showMessage: false,
        }
    },
    head: {
        title() {
            return {
                inner: this.title,
            }
        },
    },
    computed: {
        searchIcon() {
            if(this.$route.meta.searchIcon) {
                return true;
            }
            return false;
        },
        backIcon() {
            if(this.$route.meta.backIcon) {
                return true;
            }
            return false;
        },
        depth() {
            if(this.$route.meta.depth !== undefined) {
                return this.$route.meta.depth;
            }
            return 1;
        }
    },
    methods: {
        updateTitle() {
            if (this.$route) {
                if(this.$route.matched.some(record => record.meta.pageTitle)) {
                    this.title = this.$route.meta.pageTitle
                    this.$emit('updateHead')
                }
            }
        },
        backOne() {
            this.$router.go(-1);
        }
    },
    watch: {
        value(newVal) {
            Session.set("searchValue", newVal);
        },
        "$route.meta.pageTitle"(newVal) {
            this.updateTitle();
        }
    },
    mounted() {
        this.updateTitle();
        this.showMessage = true;
    },
    meteor: {
        changingTitleFromSession() {
            this.updateTitle();
            return Session.get("titleChangeHappen");
        }
    }
}
</script>
