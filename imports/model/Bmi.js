import {
    Class
} from 'meteor/jagi:astronomy';
import {
    Meteor
} from "meteor/meteor";

export const Bmi = Class.create({
    name: "Bmi",
    collection: new Mongo.Collection('bmis'),
    fields: {
        userId: String,
        weight: Number,
        height: Number,
        age: Number,
    },
    helpers: {
        bmi() {
            let inM = this.height /100;
            return (this.weight / (inM * inM)).toFixed(1);
        },
        description() {
            let bmi = parseFloat(this.bmi());
            if (bmi < 16) {
                return "Severe Thinness";
            }

            if (bmi >= 16 && bmi <= 17 ) {
                return "Moderate Thinness";
            }

            if (bmi > 17 && bmi <= 18.5 ) {
                return "Mild Thinness";
            }

            if (bmi > 18.5 && bmi <= 25 ) {
                return "Normal";
            }

            if (bmi > 25 && bmi <= 30 ) {
                return "Overweight";
            }
            
            if (bmi > 30 && bmi <= 35 ) {
                return "Obese Class I";
            }

            if (bmi > 35 && bmi <= 40 ) {
                return "Obese Class II";
            }

            if (bmi > 40 ) {
                return "Obese Class II";
            }
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