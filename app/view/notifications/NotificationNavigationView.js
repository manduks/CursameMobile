/**
 * @class Cursame.view.notifications.NotificationNavigationView.js
 * @extends Ext.navigation.View
 * The navigation view of the cursame notifications, this is to navigate between the  notifications
 * @author @manduks
 */
Ext.define('Cursame.view.notifications.NotificationNavigationView', {
	extend: 'Ext.navigation.View',
	xtype: 'notificationnavigationview',

	requires: [
		'Cursame.view.notifications.NotificationsList'
	],
	config: {
        defaultBackButtonText: lang.back,
		items: {
			xtype: 'notificationslist',
			title: lang.notifications
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
