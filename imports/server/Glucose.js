import { Class } from 'meteor/jagi:astronomy';
import { Glucose } from '/imports/model/Glucose';

Glucose.extend({
    meteorMethods: {
        create(obj) {
            this.value = parseFloat(obj.value);
            if (obj.unit === 1) {
                this.value = this.value * 18.01801801801802;
            }
            this.userId = Meteor.userId();
            this.condition = obj.condition;
            return this.save();
        },
    }
});


Meteor.publishComposite('myGlucose', function(refresh = 0) {
    return {
        find: function() {
            return Glucose.find({userId: this.userId});
        },
    };
});

Meteor.publishComposite('latestGlucose', function(refresh = 0) {
    return {
        find: function() {
            return Glucose.find({userId: this.userId}, {limit: 1,sort: {createdAt: -1}});
        },
    };
});