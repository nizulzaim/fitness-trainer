import { Class } from 'meteor/jagi:astronomy';
import { BloodPressure } from '/imports/model/BloodPressure';

BloodPressure.extend({
    meteorMethods: {
        create(obj) {
            this.systolic= parseFloat(obj.systolic),
            this.diastolic= parseFloat(obj.diastolic),
            this.userId = Meteor.userId();
            this.condition = obj.condition;
            return this.save();
        },
    }
});


Meteor.publishComposite('myBP', function(refresh = 0) {
    return {
        find: function() {
            return BloodPressure.find({userId: this.userId});
        },
    };
});

Meteor.publishComposite('latestBP', function(refresh = 0) {
    return {
        find: function() {
            return BloodPressure.find({userId: this.userId}, {limit: 1,sort: {createdAt: -1}});
        },
    };
});