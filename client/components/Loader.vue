<template>
    <reveal v-model="showLoader" :enable-overlay-click="false">
        <div v-if="showLoader">
            <div class="showbox">
                <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10" />
                    </svg>
                </div>
            </div>
        </div>
    </reveal>
</template>

<script>
    export default {
        data() {
            return {
                showLoader: false,
            }
        },
        methods: {
            toggle() {
                return this.showLoader = !this.showLoader;
            },
            enable() {
                return this.showLoader = true;
            },
            disable() {
                setTimeout(()=> {
                    return this.showLoader = false;
                }, 1000)
            }
        }
    }
</script>

<style scoped lang="scss">
    $green: #008744;
    $blue: #0057e7;
    $red: #d62d20;
    $yellow: #ffa700;
    $white: #eee;

    // scaling... any units
    $width: 48px;

    body {
        background-color: $white;
    }

    // demo-specifi

    // end demo-specific
    .loader {
        position: relative;
        margin: 0 auto;
        width: $width;
        &:before {
            content: '';
            display: block;
            padding-top: 100%;
        }
    }

    .circular {
        animation: rotate 2s linear infinite;
        height: 100%;
        transform-origin: center center;
        width: 40px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }

    @keyframes color {
        100%,
        0% {
            stroke: $red;
        }
        40% {
            stroke: $blue;
        }
        66% {
            stroke: $green;
        }
        80%,
        90% {
            stroke: $yellow;
        }
    }
</style>