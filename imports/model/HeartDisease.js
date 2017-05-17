import {
    Class
} from 'meteor/jagi:astronomy';
import {
    Meteor
} from "meteor/meteor";

export const HeartDisease = Class.create({
    name: "HeartDisease",
    collection: new Mongo.Collection('heartdiseases'),
    fields: {
        userId: String,
        question: [Boolean]
    },
    helpers: {
        localCreatedAt() {
            let local = new Date();
            let localOffset = local.getTimezoneOffset() * 60000;

            let createdAtOffset = this.createdAt.getTimezoneOffset() * 60000;

            return new Date(this.createdAt - (localOffset - createdAtOffset));
        },
        category() {
            let yes = 0;
            this.question.forEach(item => {
                if (item) {
                    yes++;
                }
            });

            if (yes < 3) {
                return 0;
            }

            if (yes>= 3 && yes <= 5) {
                return 1;
            }

            return 2;
        },
        categoryDescription() {
            if (this.category() === 0 ) return "Low Risk";
            if (this.category() === 1 ) return "Moderate";
            if (this.category() === 2 ) return "High Risk";
        },
        exerciseLists() {
            if (this.category() === 0) {

                return [
                    "You can slowly work up to at least 2½ hours (150 minutes) of moderate-intensity aerobic physical activity (e.g., brisk walking) every week ",
                    "1 hour and 15 minutes (75 minutes) of vigorous intensity aerobic physical activity (e.g., jogging, running) combination of both every week. ",
                    "2 or more days a week you need muscle-strengthening activities that work all major muscle groups (legs, hips, back, abdomen, chest shoulders, and arms). Children should get at least 60 minutes of activity every day."
                ];
            }
            if (this.category() === 1) {
                return [
                    "Aerobic activity uses your heart and lungs for a long period of time. It also helps your heart use oxygen better and improves blood flow. You want to make your heart work a little harder every time, but not too hard.",
                ];
            }

            return [
                "Aerobic activity uses your heart and lungs for a long period of time. It also helps your heart use oxygen better and improves blood flow. You want to make your heart work a little harder every time, but not too hard.",
                "Start slowly. Choose an aerobic activity such as walking, swimming, light jogging, or biking. Do this at least 3 to 4 times a week.",
                "Always do 5 minutes of stretching or moving around to warm up your muscles and heart before exercising. Allow time to cool down after you exercise. Do the same activity but at a slower pace.",
                "Take rest periods before you get too tired. If you feel tired or have any heart symptoms, stop. Wear comfortable clothing for the exercise you are doing.",
                "During hot weather, exercise in the morning or evening. Be careful not to wear too many layers of clothes. You can also go to an indoor shopping mall to walk.",
                "When it is cold, cover your nose and mouth when exercising outside. Go to an indoor shopping mall if it is too cold or snowy to exercise outside. Ask your provider if it is OK for you to exercise when it is below freezing.",
                "Resistance weight training may improve your strength and help your muscles work together better. This can make it easier to do daily activities. These exercises are good for you. But keep in mind they do not help your heart like aerobic exercise does.",
            ];
        },
        nutritionLists() {
            if (this.category() === 0) {
                return [
                    "Vegetables",
                    "fruits, ",
                    "whole grains; includes low-fat dairy products, poultry, fish, legumes, non-tropical vegetable oils, and nuts; and limits intake of sweets, sugar-sweetened beverages, and red meats"
                ];
            }

            if (this.category() === 1) {
                return [
                    "Fruits, vegetables and whole grains",
                    "Low-fat dairy products and low-fat proteins, such as poultry, fish and legumes",
                    "Moderate amounts of healthy fats, such as unsalted nuts, and vegetable and olive oils",
                    "Don't smoke cigarettes or use tobacco",
                ];
            }
            return [
                "Fruits, vegetables and whole grains",
                "Low-fat dairy products and low-fat proteins, such as poultry, fish and legumes",
                "Moderate amounts of healthy fats, such as unsalted nuts, and vegetable and olive oils",
                "Don't smoke cigarettes or use tobacco;",
            ];
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