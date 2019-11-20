/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
        login: {
            type: 'string',
            required: true,
            unique: true
        },

        password: {
            type: 'string'
        },

        isAdmin: {
            type: 'boolean',
            defaultsTo: false
        },
        isFO: {
            type: 'boolean',
            defaultsTo: false
        },
        comments: {
            collection: 'comments',
            via: 'user',
        },

        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
        permittedSubsystems: {
            collection: 'subsystem',
            via: 'user',
            through: 'permission'
        }
    },

    beforeCreate: function (valuesToSet, proceed) {
        // Hash password
        sails.helpers.passwordHash(valuesToSet.password).exec((err, hashedPassword) => {
            if (err) { return proceed(err); }
            valuesToSet.password = hashedPassword;
            return proceed();
        });
    },

    beforeUpdate: function (valuesToSet, proceed) {
        if (valuesToSet.password) {
            sails.helpers.passwordHash(valuesToSet.password).exec((err, hashedPassword) => {
                if (err) { return proceed(err); }
                valuesToSet.password = hashedPassword;
                return proceed();
            });
        }
        return proceed();
    },

    customToJSON: function () {
        return _.omit(this, ['password'])
    }


};

