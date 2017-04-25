import { Class } from 'meteor/jagi:astronomy';
import { Bmi } from '/imports/model/Bmi';

Bmi.extend({
    meteorMethods: {
        create(obj) {
            this.weight = parseFloat(obj.weight);
            this.height = parseFloat(obj.height);
            this.userId = Meteor.userId();
            this.age = 24;

            return this.save();
        },
    }
});


Meteor.publishComposite('myBmi', function(refresh = 0) {
    return {
        find: function() {
            return Bmi.find({userId: this.userId});
        },
    };
});