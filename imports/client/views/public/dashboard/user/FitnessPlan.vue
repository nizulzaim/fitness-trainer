<template>
    <div class="appbar-padding" v-wheight>
        <page-container>
            <cards>
                <router-link to="/dashboard/diet-plan-details/1">
                    <img src="/Picture1.png" class="img-responsive" alt="">
                </router-link>
                <cards-content>
                    <div class="font-title font-light no-margin">Coach <strong>Kodin</strong></div>
                </cards-content>
                <divider></divider>
                <cards-action>
                    <div class="pull-right">
                        <router-link to="/dashboard/diet-plan-details/1">
                            <color-button class="primary">View</color-button>
                        </router-link>
                    </div>
                </cards-action>
            </cards>
            <cards>
                <router-link to="/dashboard/diet-plan-details/2">
                    <img src="/Picture2.png" class="img-responsive" alt="">
                </router-link>
                <cards-content>
                    <div class="font-title font-light no-margin">Coach <strong>Jason Lee</strong></div>
                </cards-content>
                <divider></divider>
                <cards-action>
                    <div class="pull-right">
                        <router-link to="/dashboard/diet-plan-details/2">
                            <color-button class="primary">View</color-button>
                        </router-link>
                    </div>
                </cards-action>
            </cards>
        </page-container>
    </div>
</template>
