/**
 * @class Cursame.profile.Phone
 * @extends Ext.app.Profile
 * This is the tablet profile
 * @manduks
 */
Ext.define('Cursame.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'tablet',
        namespace: 'tablet',
        controllers: ['Main'],
        views: ['Main']
    },

    isActive: function() {
        return !Ext.os.is.Phone;
    },

    launch: function() {
        Ext.create('Cursame.view.tablet.Main');
    }
});
