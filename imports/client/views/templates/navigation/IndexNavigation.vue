<template>
    <side-navigation v-depth="1">
        <div>
            <img src="/img/a.jpg" class="img-responsive" alt="">
            <div class="background-black" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.2">

            </div>
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding-left: 24px; padding-top: 20px;">
                <div class="row has-gutter middle-xs">
                    <div class="col-xs-1">
                        <avatar text="Nizul Zaim"></avatar>
                    </div>
                    <div class="col-xs">
                        <div class="font-subhead font-medium no-margin  color-white">Nizul Zaim</div>
                        <div class="font-subhead no-margin color-white">Nizul Zaim</div>
                    </div>
                </div>
            </div>
            
            
        </div>
        <navigation></navigation>
    </side-navigation>
</template>

<script>
    import Navigation from "./Navigation.vue";

    export default {
        components:{
            Navigation,
        }
    }
</script>