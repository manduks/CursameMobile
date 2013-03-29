/**
 * @class Cursame.view.users.UserNavigationView
 * @extends Ext.navigation.View
 * The navigation view of the cursame users, this is to navigate between the  users
 * @author @manduks
 */
Ext.define('Cursame.view.users.UserNavigationView', {
	extend: 'Ext.navigation.View',
	xtype: 'usernavigationview',

	requires: [
		'Cursame.view.users.UsersList'
	],
	config: {
		items: {
			xtype: 'userslist',
			titlle: 'Comunidad'
		}
	},
	applyLayout: function(config) {
		config = config || {};
		if (Ext.os.is.Android) {
			config.animation = false;
		}
		return config;
	}
});
