/**
 * @class Cursame.view.notifications.NotificationNavigationView.js
 * @extends Ext.navigation.View
 * The navigation view of the cursame notifications, this is to navigate between the  notifications
 * @author @manduks
 */
Ext.define('Cursame.view.notifications.NotificationNavigationView', {
    extend: 'Cursame.view.navigation.View',
	xtype: 'notificationnavigationview',

	requires: [
		'Cursame.view.notifications.NotificationsList'
	],
	config: {
		items: {
			xtype: 'notificationslist',
			title: Core.Lang.es.notifications
		}
	}
});
