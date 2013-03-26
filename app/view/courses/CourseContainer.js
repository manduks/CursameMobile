/**
 * @class Cursame.view.courses.CourseContainer
 * @extends Ext.List
 * This course container for the profile
 * @manduks
 */
Ext.define('Cursame.view.courses.CourseContainer', {
    extend: 'Ext.Container',
    xtype: 'coursecontainer',
    requires: ['Cursame.view.courses.CourseProfileTpl'],
    config: {
        docked: 'top',
        addedListener: false,
        tpl: Ext.create('Cursame.view.courses.CourseProfileTpl')
    }
});