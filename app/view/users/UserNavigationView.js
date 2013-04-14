/**
 * @class Cursame.view.users.UserNavigationView
 * @extends Ext.navigation.View
 * The navigation view of the cursame users, this is to navigate between the  users
 * @author @manduks
 */
Ext.define('Cursame.view.users.UserNavigationView', {
    extend: 'Cursame.view.navigation.View',
	xtype: 'usernavigationview',

	requires: [
		'Cursame.view.users.UsersList'
	],
	config: {
		items: {
			xtype: 'userslist',
			title: 'Comunidad'
		}
	}
});
