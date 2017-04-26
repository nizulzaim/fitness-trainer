<template>
    <div class="appbar-padding background-white" style="min-height: 100%">
        <list class="hover not-auto-dense">
            <router-link v-for="d in filterDatas" :to="{ name: 'SelfTreatmentDetails', params: { id: d.id }}">
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

    export default {
        data() {
            return {
                datas: Datas,
            }
        },
        computed: {
            filterDatas() {
                return this.datas.filter((d) => {
                    if (!this.searchValue) {
                        return true;
                    }
                    return d.title.toLowerCase().search(this.searchValue.toLowerCase()) > -1 ;
                })
            }
        },
        meteor: {
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