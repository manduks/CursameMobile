/**
 * @class Cursame.view.publications.PublicationNavigationView
 * @extends Ext.navigation.View
 * The navigation view of the cursame publications, this is to navigate between the  publications
 * @author @manduks
 */
Ext.define('Cursame.view.publications.PublicationNavigationView', {
	extend: 'Cursame.view.navigation.View',
	xtype: 'publicationsnavigationview',

	requires: [
		'Cursame.view.publications.PublicationsList'
	],
	config: {
		items: {
			xtype: 'publicationslist',
			title: Core.Lang.es.start
		}
	}
});