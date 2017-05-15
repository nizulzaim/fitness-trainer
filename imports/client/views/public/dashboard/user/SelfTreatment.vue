<template>
    <div class="appbar-padding background-white" style="min-height: 100%">
        <list class="hover not-auto-dense">
            <router-link v-for="d in filterDatas" :key="d._id" :to="{ name: 'SelfTreatmentDetails', params: { id: d._id }}">
                <list-item  v-ripple class="color-grey-900">
                    <span slot="left">
                        <avatar :text="d.title"></avatar>
                    </span>
                    {{d.title}}
                    <span slot="right">
                        <icon name="arrow-right" class="color-indigo"></icon>
                    </span>
                </list-item>
            </router-link>
        </list>
    </div>
</template>

<script>
    import Datas from "/imports/client/dummyData";
    import {Treatment} from '/imports/model/Treatment.js';
    export default {
        computed: {
            filterDatas() {
                return this.datas.filter((d) => {
                    if (this.searchValue === undefined || this.searchValue === null) {
                        return true;
                    }

                    if (this.searchValue === "") {
                        Session.set("titleChangeHappen",this.$defaultTitle);
                        return true;
                    }

                    return d.title.toLowerCase().search(this.searchValue.toLowerCase()) > -1 ;
                })
            }
        },
        beforeDestroy() {
            Session.set("searchValue", null);
            Session.set("titleChangeHappen",this.$defaultTitle);
        },
        meteor: {
            subscribe: {
                treatments: [],
            },
            datas() {
                return Treatment.find();
            },
            searchValue() {
                let value = Session.get("searchValue");
                if (value) {
                    this.$route.meta.pageTitle = "Search: " + value;
                } else {
                    if (!this.$defaultTitle ) {
                        this.$defaultTitle = this.$route.meta.pageTitle;
                    }
                    this.$route.meta.pageTitle = this.$defaultTitle;
                }
                Session.set("titleChangeHappen",this.$route.meta.pageTitle);
                return value;
            }
        }
    }
</script>