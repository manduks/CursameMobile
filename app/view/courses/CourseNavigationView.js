/**
 * @class Cursame.view.courses.CourseNavigationView.js
 * @extends Ext.navigation.View
 * The navigation view of the cursame courses, this is to navigate between the  courses
 * @author @manduks
 */
Ext.define('Cursame.view.courses.CourseNavigationView', {
	extend: 'Ext.navigation.View',
	xtype: 'coursenavigationview',

	requires: [
		'Cursame.view.courses.CoursesList',
		'Cursame.view.courses.CourseWall'
	],
	config: {
        defaultBackButtonText: lang.back,
		items: {
			xtype: 'courseslist',
			title: lang.courses
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
