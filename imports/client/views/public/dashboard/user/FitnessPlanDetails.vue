<template>
    <div style="height:100%" class="appbar-padding background-white">
        <tab id="tab" v-depth="1" :class="'background-theme'">
            <tab-item v-ripple>Details</tab-item>
            <tab-item v-for="(day, index) in data[paramId].details" :key="index" v-ripple>{{getDay(index)}}</tab-item>
        </tab>
        <tab-content element="#tab" :size="2">
            <tab-content-item>
                <div class="font-center" style="padding-top: 20px;">
                    <img :src="data[paramId].img" alt="">
                    <div class="font-title">
                        {{data[paramId].name}}
                    </div>
                    <div class="font-subhead">
                        {{data[paramId].description}}
                    </div>
                    <div class="font-subhead">
                        Contact: {{data[paramId].contact}}
                    </div>
                </div>
            </tab-content-item>
            <tab-content-item v-for="(day, index) in data[paramId].details">
                <div class="font-center" style="padding-top: 20px; padding-left: 20px; padding-right: 20px;" v-for="content in day.content">
                    <div class="font-title">
                        {{content.title}}
                    </div>
                    <div class="font-subhead">
                        {{content.text}}
                    </div>
                </div>
            </tab-content-item>
        </tab-content>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                paramId: this.$route.params.id - 1,
                data: [
                    {
                        img: "/Picture1.png",
                        name: "Kodin",
                        description: "Nutritionist, Personal Trainer, Kuala Lumpur",
                        contact: "013-6754432",
                        details: [
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            },
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            },
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            },
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            },
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            },
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            },
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            }
                        ]
                    },
                    {
                        img: "/Picture2.png",
                        name: "Jason Lee",
                        description: "Nutritionist, Personal Trainer, Kuala Lumpur",
                        contact: "013-6754432",
                        details: [
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            },
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            },
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            },
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            },
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            },
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            },
                            {
                                content: [
                                    {
                                        "title": "Breakfast:",
                                        "text": "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey."
                                    }, 
                                    {
                                        title: "Lunch:",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread."
                                    }
                                        
                                ]
                                
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            getDay(value) {
                var weekday = new Array(7);
                weekday[0] =  "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";
                return weekday[value];
            }
            
        }
    }
</script>

