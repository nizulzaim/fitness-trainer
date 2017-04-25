import { Class } from 'meteor/jagi:astronomy';
import { User } from '/imports/model/User';

User.extend({
    meteorMethods: {
        create(userObj, profileObj = {}) {
            userObj.profile = profileObj;
            Accounts.createUser(userObj);
        },
        update(profileObj) {
            this.profile.name = profileObj.name;
            this.profile.gender = profileObj.gender;
            this.profile.yearOfBirth = profileObj.yearOfBirth;

            console.log(this.yearOfBirth);

            return this.save();
        },
        createStaff(userObj, profileObj = {}) {
            userObj.profile = profileObj;
            userObj.profile.userType = [1];
            Accounts.createUser(userObj);
        },
        isExist(username) {
            let user = User.findOne({username});
            return user !== undefined;
        }
    }
});

Meteor.publishComposite('loginUser', function(refresh = 0) {
    return {
        find: function() {
            return User.find(this.userId);
        },
    };
});

if (!User.findOne()) {
    let user = new User();
    user.create({
        username: "admin",
        password: "n",
    }, {
        name: "Admin",
        userType: [0],
        email: "mnizulzaim@gmail.com",
        gender: 0,
    });
}
