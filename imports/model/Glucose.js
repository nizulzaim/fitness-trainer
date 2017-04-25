import {
    Class
} from 'meteor/jagi:astronomy';
import {
    Meteor
} from "meteor/meteor";

export const Glucose = Class.create({
    name: "Glucose",
    collection: new Mongo.Collection('glucoses'),
    fields: {
        value: Number,
        userId: String,
        condition: {type: [Number], default: []},
    },
    helpers: {
        category() {
            if (this.value >= 70 && this.value <= 100) {
                return 0;
            }

            if (this.value >= 101 && this.value <= 125) {
                return 1;
            }

            if (this.value >= 126) {
                return 2;
            }
        },
        categoryDescription() {
            let cat = this.category();
            if (cat === 0) {
                return "Normal";
            }
            if (cat=== 1) {
                return "Pre-Diabetes";
            }
            return "Diabetes";
        },
        nutritionLists() {
            let cat = this.category();
            if (cat === 0) {
                let res = [
                    "Drink more water",
                    "Eat protein food (eg; wild fish such as salmon, free-range eggs, raw dairy product(inc yogurt or raw cheese))",
                    "Fruit (Not too much with sugar)",
                    "Eat more whole grain",
                    "Eat unsaturated fats (eg: vegetables oil)",
                    "Cut down on refined starches",
                    "Stop Smoking",
                ];

                return res;
            }
            if (cat=== 1) {
                let res = [
                    "Drink more water",
                    "Vegetables",
                    "Fruit (Not too much with sugar)",
                    "Eat more whole grain",
                    "Eat unsaturated fats (eg: vegetables oil)",
                    "Cut down on refined starches",
                    "Quit Smoking",
                    "Avoid alcohol",
                ];

                return res;
            }
            let res = [
                "Fruit (each serving contains about 15-gram carbohydrate) - 1 small/medium piece of fresh fruit",
                "Vegetable (each serving contains about 5 grams’ carbohydrates) - 1 cup raw vegetables",
                "Starch (each serving contains about 15 grams carbohydrates) - 1 slice or ounce bread",
                "Sugar, honey, molasses -1 teaspoon",
                "Milk (does not include cream, yogurt or cheese) - 1 cup milk",
                "Meat - 1 ounce meat, fish, cheese",
                "Fat (includes nuts, seeds and small amounts of bacon and peanut butter) - 1 teaspoon oil, butter or magarine",
            ];
            return res;
        },
        exerciseLists() {
            let cat = this.category();
            if (cat === 0) {
                let res = [
                    "Doing about 30–60 minutes of exercise most days of the week (such as running, cycling, swimming and lifting weights)"
                ];

                return res;
            }
            if (cat=== 1) {
                let res = [
                    "Aerobic", 
                    "Walking",
                    "Jogging/Running",
                    "Tennis",
                    "Basketball",
                    "Swimming",
                    "Biking",
                    "Strength training",
                    "Flexibility work",
                ];

                return res;
            }
            let res = [
                "Fast paced walking",
                "Light jogging",
                "Bike riding",
                "Rowing",
                "Playing doubles tennis or badminton",
                "Water aerobics",
            ];
            return res;
        },
        localCreatedAt() {
            let local = new Date();
            let localOffset = local.getTimezoneOffset() * 60000;

            let createdAtOffset = this.createdAt.getTimezoneOffset() * 60000;

            return new Date(this.createdAt - (localOffset - createdAtOffset));
        },
        mmolValue() {
            return this.value * 0.0555;
        }
    },
    behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        },
        softremove: {
            removedFieldName: 'removed',
            hasRemovedAtField: true,
            removedAtFieldName: 'removedAt'
        }
    },
});