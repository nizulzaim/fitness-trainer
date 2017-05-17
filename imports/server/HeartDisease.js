import { Class } from 'meteor/jagi:astronomy';
import { HeartDisease } from '/imports/model/HeartDisease';

HeartDisease.extend({
    meteorMethods: {
        create(array) {
            this.userId = Meteor.userId();
            this.question = array;
            console.log(array);
            return this.save();
        },
    }
});

Meteor.publishComposite('myHDisease', function(refresh = 0) {
    return {
        find: function() {
            return HeartDisease.find({userId: this.userId});
        },
    };
});

Meteor.publishComposite('latestHeartDisease', function(refresh = 0) {
    return {
        find: function() {
            return HeartDisease.find({userId: this.userId}, {limit: 1,sort: {createdAt: -1}});
        },
    };
});