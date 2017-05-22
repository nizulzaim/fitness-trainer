<template>
    <div class="appbar-padding background-white" v-wheight >
        <div style="height: 100%" v-if="data[paramId].details.length">
            <tab id="tab" v-depth="1" :class="'background-theme'" style="height: 50px">
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
                                        title: "Breakfast:",
                                        text: "45g oats with 300ml skimmed milk and 1tsp honey; 200ml apple juice.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt with blueberries and honey.",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "Grilled chicken (1 chicken breast) salad sandwich with wholemeal bread.",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "Smoothie – blend 25g whey protein, 80g raspberries, 80g blueberries, 50g blackberries and water.",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "120g tuna steak with stir-fried broccoli, mushrooms, green beans, sesame seeds and oil; 70g brown rice.",
                                    }
                                ]
                            },
                            {
                                content: [
                                    {
                                        title: "Breakfast:",
                                        text: " Smoothie – blend 25g whey protein, 300ml skimmed milk, 100g strawberries and a banana.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "120g low-fat yoghurt, blueberries and honey.",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "Tuna sandwich on wholemeal bread; 200ml skimmed milk.",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "Mixed nuts, raisins and cranberries.",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "100g chicken, bacon and avocado salad.",
                                    }
                                ]                                
                            },
                            {
                                content: [
                                    {
                                        title: "Breakfast:",
                                        text: "Smoothie – blend 25g whey protein, 300ml skimmed milk, 100g strawberries and a banana.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "90g mackerel on 1 slice of wholemeal toast.",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "1 apple; chicken salad sandwich on wholemeal bread.",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "1 banana.",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "120g fillet steak with spinach and 2 grilled tomatoes.",
                                    }
                                ]  
                            },
                            {
                                content: [
                                    {
                                        title: "Breakfast:",
                                        text: "4 scrambled egg whites on 2 slices of wholemeal toast.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "1 low-fat yoghurt with blueberries and a handful of oats and honey.",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "Smoothie – blend 25g whey protein, 80g raspberries, 80g blueberries, 50g blackberries and water; 30g brazil nuts.",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "100g low-fat cottage cheese and pineapple.",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "Tuna niçoise salad (100g tuna, mixed salad leaves, plum tomatoes, a red pepper and 4 new potatoes).",
                                    }
                                ]  
                            },
                            {
                                content: [
                                    {
                                        title: "Breakfast:",
                                        text: "45g oats with 300ml skimmed milk and 1tsp honey.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "10 radishes with balsamic vinaigrette.",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "1 can of tuna with beetroot; 1 low-fat yoghurt.",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "Smoothie – blend 25g whey protein, 80g raspberries, 80g blueberries and 50g blackberries with water.",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "120g barbecue chicken kebab with peppers and 70g brown rice",
                                    }
                                ]  
                            },
                            {
                                content: [
                                    {
                                        title: "Breakfast:",
                                        text: "2-egg omelette with cheese.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "Smoothie: blend 25g protein, 1 apple, 50g blueberries, 50g blackberries and a banana with water.",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "90g sardines on 1 slice of wholemeal toast.",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "150g raw carrots and hummus.",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "100g grilled salmon with green beans, asparagus and 70g brown rice.",
                                    }
                                ]  
                            },
                            {
                                content: [
                                    {
                                        title: "Breakfast:",
                                        text: "4 scrambled egg whites on 2 slices of wholemeal toast; 1 grapefruit.",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "Smoothie – blend 25g protein, 300ml skimmed milk, 50g blueberries, 50g blackberries and a banana.",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "Tuna sandwich on wholemeal bread; 1 pear.",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "Mixed nuts and fruit bar.",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "120g fillet steak with 1 small jacket potato, spinach and 1 grilled tomato.",
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
                                        title: "Breakfast:",
                                        text: "3 Scrambled Eggs, 1 large grapefruit",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "25 almonds",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "Turkey Wrap, 1 apple",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "1 piece of string cheese",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "Spicy Chicken and Pasta, Side salad and 2 Tbsp olive oil/vinegar dressing",
                                    }
                                ] 
                            },
                            {
                                content: [
                                    {
                                        title: "Breakfast:",
                                        text: "2 Tbsp of peanut butter with 1 piece of toast, 1 banana",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "2 small boxes of raisins",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "Leftover Spicy Chicken and Pasta",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "0% fat Greek yogurt",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "Miso Salmon, 2 cups of broccoli",
                                    }
                                ]
                            },
                            {
                                content: [
                                    {
                                        title: "Breakfast:",
                                        text: "Lean Eggs and Ham, 1 large grapefruit",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "25 almonds",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "Black Bean and Cheese Burrito, 1 apple",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "1 piece of string cheese",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "Veggie Burger and bun, Salad with 4 Tbsp olive oil/vinegar dressing, 1 serving of sweet potato fries",
                                    }
                                ]
                            },
                            {
                                content: [
                                    {
                                        title: "Breakfast:",
                                        text: "Berry Wafflewich, 0% fat Greek yogurt",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "15 snap peas, 2 Tbsp of hummus",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "Gobbleguac Sandwich, 1 apple",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "1 banana, 1 piece of string cheese",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "Steamed Snapper with Pesto, 1 cup of brown rice, 2 cups of broccoli",
                                    }
                                ]
                            },
                            {
                                content: [
                                    {
                                        title: "Breakfast:",
                                        text: "0% fat Greek yogurt, 1 large grape fruit",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "1 Luna Bar",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "The I-Am-Not-Eating-Salad Salad, 25 almonds",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "30 baby carrots, 4 Tbsp of hummus",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "Chicken Spinach Parm, 1 cup of brown rice, 2 cups of snow peas",
                                    }
                                ]
                            },
                            {
                                content: [
                                    {
                                        title: "Breakfast:",
                                        text: "Loaded Vegetable Omelet, 1 banana",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "1 piece of string cheese",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "Turkey Wrap, 1 apple",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "10 cherry tomatoes, 2 Tbsp of hummus",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "Quick Lemon Chicken with Rice, 2 cups of broccoli",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "1 Sugar-Free Fudgsicle",
                                    }
                                ]
                            },
                            {
                                content: [
                                    {
                                        title: "Breakfast:",
                                        text: "Loaded Vegetable Omelet, 1 banana",
                                    },
                                    {
                                        title: "Snack: ",
                                        text: "15 baby carrots, 2 Tbsp of hummus",
                                    },
                                    {
                                        title: "Lunch: ",
                                        text: "Eat Out",
                                    },
                                    {
                                        title: "Snack:",
                                        text: "0% fat Greek yogurt",
                                    },
                                    {
                                        title: "Dinner: ",
                                        text: "Penne with Chicken Marengo, 2 cups of broccoli",
                                    },
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

