/**
 * @class Cursame.view.publications.PublicationNavigationView
 * @extends Ext.navigation.View
 * The navigation view of the cursame publications, this is to navigate between the  publications
 * @author @manduks
 */
Ext.define('Cursame.view.publications.PublicationNavigationView', {
	extend: 'Ext.navigation.View',
	xtype: 'publicationsnavigationview',

	requires: [
		'Cursame.view.publications.PublicationsList'
	],
	config: {
        defaultBackButtonText: Core.Lang.es.back,
		items: {
			xtype: 'publicationslist',
			title: Core.Lang.es.start
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
