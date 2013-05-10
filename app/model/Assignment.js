/**
 * @class Cursame.model.Assignment
 * @extends Ext.data.Model
 * The model for the courses
 */
Ext.define('Cursame.model.Assignment', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'title',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string',
                mapping: 'brief_description'
            },
            {
                name: 'accomplishment',
                type: 'int'
            },
            {
                name: 'calification',
                type: 'float',
                mapping: 'rub_calification'
            },
            {
                name: 'user',
                type: 'object'
            },
            {
                name: 'user_name',
                type: 'string',
                mapping: 'user',
                convert: function (user, r) {
                    var name = '';
                    if (user && !Ext.isEmpty(user.first_name)) {
                        name = user.first_name;
                    }
                    if (user && !Ext.isEmpty(user.last_name)) {
                        name += ' ' + user.last_name;
                    }
                    if (Ext.isEmpty(name)) {
                        name = 'Usuario';
                    }
                    return name;
                }
            },
            {
                name: 'created',
                type: 'date',
                mapping: 'created_at',
                convert: function (date, rec) {
                    return Core.Utils.timeAgo(date);
                }
            }
        ],
        proxy: {
            type: 'jsonp',
            url: Cursame.APIURL + 'api/assignments.json',
            reader: {
                type: 'json',
                rootProperty: 'assignments'
            }
        }
    }
});