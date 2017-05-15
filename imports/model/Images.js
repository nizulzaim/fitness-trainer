import {FilesCollection} from 'meteor/ostrio:files';
import { Class } from 'meteor/jagi:astronomy';
import {Meteor} from "meteor/meteor";

export const Images = new FilesCollection({
    collectionName: 'images',
    allowClientCode: false, // Disallow remove files from Client
    // debug: true,
    storagePath: '/images/fitness-trainer',
    permissions: 0774,
    parentDirPermissions: 0774,
    onBeforeUpload: function (file) {
        if (/jpg|png/i.test(file.extension)) {
            return true;
        } else {
            return 'Please input jpg or png file';
        }
    }
});
