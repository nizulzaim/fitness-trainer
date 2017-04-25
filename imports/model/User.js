import {
    Class
} from 'meteor/jagi:astronomy';
import {
    Meteor
} from "meteor/meteor";

export const UserProfile = Class.create({
    name: 'UserProfile',
    fields: {
        name: String,
        yearOfBirth: Number,
        gender: Number,
        country: {
            type: String,
            optional: true,
        },
        email: {
            type: String,
            optional: true,
        },
        userType: {
            type: [Number],
            immutable: true,
            default: [1],
        },
    }
});

export const User = Class.create({
    name: "User",
    collection: Meteor.users,
    fields: {
        username: String,
        profile: UserProfile,
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
    helpers: {
        isAdmin() {
            return this.profile.userType.indexOf(0) > -1;
        },
        isNormal() {
            return this.profile.userType.indexOf(1) > -1;
        }
    }
});