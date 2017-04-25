import {
    Class
} from 'meteor/jagi:astronomy';
import {
    Meteor
} from "meteor/meteor";

export const BloodPressure = Class.create({
    name: "BloodPressure",
    collection: new Mongo.Collection('bps'),
    fields: {
        userId: String,
        systolic: Number,
        diastolic: Number,
        condition: {type: [Number], default: []},
    },
    helpers: {
        category() {
            let val0 = this.systolic < 90 || this.diastolic < 60;
            let val1 = (this.systolic >= 90 && this.systolic < 120) || (this.diastolic >= 60 && this.diastolic < 80)
            let val2 = (this.systolic >= 120 && this.systolic < 139) || (this.diastolic >= 80 && this.diastolic < 89);
            let val3 = (this.systolic >= 140 && this.systolic < 159) || (this.diastolic >= 90 && this.diastolic < 99);
            let val4 = (this.systolic >= 160 ) || (this.diastolic > 100);

            if (val0) {
                return 0; // low blood
            }

            if (val1) {
                return 1; // normal
            }

            // if ((val2 || val3 || val4) && this.condition.length === 0) {
            //     return 2; // have high blood but no condition
            // }

            if (val2) {
                return 3; // pre
            }

            if (val3) {
                return 4; // stage 1
            }

            if (val4) {
                return 5; //stage 2
            }
        },
        categoryDescription() {
            let cat = this.category();
            if (cat === 0) {
                return "Low Blood Pressure";
            }
            if (cat=== 1) {
                return "Normal Blood Pressure";
            }

            if (cat=== 3) {
                return "Prehypertension";
            }

            if (cat=== 4) {
                return "Hypertension Stage 1";
            }

            return "Hypertension Stage 2";
        },
        exerciseLists() {
            let result = [];
            let cat = this.category();
            let activities = [
                "Brisk walking",
                "Swimming (can help in circulation of blood pressure)",
                "Running",
                "Swimming",
                "Cycling",
                "Weight",
                "Jogging",
                "Avoid stress",
            ];

            if (cat === 0) {
                result.push(activities[0]);
                result.push(activities[1]);
            }

            if (cat >= 1) {
                result.push(activities[3]);
                result.push(activities[4]);

                if (cat === 1) {
                    result.push(activities[2]);
                }

                if (cat <= 2) {
                    result.push(activities[5]);
                }
            }

            if (cat >= 2) {
                result.push(activities[6]);
                result.push(activities[7]);
            }

            return result;
        },
        nutritionLists() {
            let result = [];
            let cat = this.category();
            let nutritions = [
                "Drink more water",
                "Increase salt content in food (not too much, just want to stabilize the blood pressure)",
                "Eat small low carb meals (eg: egg, grill chicken)",
                "Fruit and vegetables (eat atleast 5 portion a day)",
                "Avoid alcohol",
                "Drink enough water daily",
                "Eat less salt",
                "Fresh Fruit",
                "Vegetable",
                "Reduce amount of salt in food",
                "Quit smoking",
                "Avoid too much salt in food",
                "Avoid caffeine",
                "Avoid salt in food",
            ];

            if (cat === 0) {
                result.push(nutritions[0]);
                result.push(nutritions[1]);
                result.push(nutritions[2]);
                result.push(nutritions[3]);
            }

            if (cat >= 0) {
                result.push(nutritions[4]);
                if (cat > 0) {
                    result.push(nutritions[7]);
                    result.push(nutritions[8]);
                    result.push(nutritions[5]);
                    if (cat === 1) {
                        result.push(nutritions[6]);
                    }

                    if (cat === 2) {
                        result.push(nutritions[9]);
                    }

                    if (cat >= 2) {
                        result.push(nutritions[8]);
                        result.push(nutritions[10]);
                    }

                    if (cat >= 3) {
                        result.push(nutritions[11]);
                        result.push(nutritions[12]);
                    }

                    if (cat >= 4) {
                        result.push(nutritions[13]);
                    }
                }
                
            }
            return result;
        },
        localCreatedAt() {
            let local = new Date();
            let localOffset = local.getTimezoneOffset() * 60000;

            let createdAtOffset = this.createdAt.getTimezoneOffset() * 60000;

            return new Date(this.createdAt - (localOffset - createdAtOffset));
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