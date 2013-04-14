/**
 * @class Cursame.view.courses.CourseNavigationView.js
 * @extends Ext.navigation.View
 * The navigation view of the cursame courses, this is to navigate between the  courses
 * @author @manduks
 */
Ext.define('Cursame.view.courses.CourseNavigationView', {
    extend: 'Cursame.view.navigation.View',
	xtype: 'coursenavigationview',

	requires: [
		'Cursame.view.courses.CoursesList',
		'Cursame.view.courses.CourseWall'
	],
	config: {
		items: {
			xtype: 'courseslist',
			title: Core.Lang.es.courses
		}
	}
});
