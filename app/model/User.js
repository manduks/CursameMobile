/**
 * @class Cursame.model.User
 * @extends Ext.data.Model
 * Description
 */
Ext.define('Cursame.model.User', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'first_name',
            type: 'string'
        }, {
            name: 'last_name',
            type: 'string'
        }, {
            name: 'avatar',
            type: 'string',
            convert:function (val,r) {
                return val.url;
            }
        } ],
        proxy: {
            type: 'jsonp',
            url: Cursame.APIURL + 'api/users.json',
            reader: {
                type: 'json',
                rootProperty: 'users'
            }
        }
    }
});