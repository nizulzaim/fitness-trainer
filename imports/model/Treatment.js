import {
    Class
} from 'meteor/jagi:astronomy';
import {
    Meteor
} from "meteor/meteor";

import {Images} from '/imports/model/Images.js';


export const Treatment = Class.create({
    name: "Treatment",
    collection: new Mongo.Collection('treatments'),
    fields: {
        title: String,
        info: String,
        imageId: String,
        sympthom: [String],
        firstAid: [String],
        prevention: {type: [String], optional: true},
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
        getImageLink() {
            let image = Images.findOne(this.imageId);
            if (image) {
                return image.link();
                // return image._downloadRoute + "/images/" + image._id + "/original/" + image._id + "." + image.extension;
            }
        }
    }
});


if(Meteor.isServer) {
    Treatment.extend({
        meteorMethods: {
            create(obj) {
                this.set(obj);
                return this.save();
            },
            removeItem() {
                this.softRemove();
            }
        }
    });


    Meteor.publishComposite('treatments', function(refresh = 0) {
        return {
            find: function() {
                return Treatment.find();
            },
            children: [
                {
                    find: function(event) {
                        return Images.find(event.imageId).cursor;
                    },
                }
            ]
        };
    });
}