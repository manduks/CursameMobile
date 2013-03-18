/**
 * @class Cursame.view.courses.CourseWall
 * @extends Ext.List
 * Este es el wall del curso
 * @manduks
 */
Ext.define('Cursame.view.courses.CourseWall', {
    extend: 'Ext.List',
    xtype: 'coursewall',

    requires: ['Cursame.view.publications.PublicationTpl','Cursame.view.courses.CourseContainer'],

    config: {
        store: 'Publications',
        pressedCls:'pressedCls',
        selectedCls :'pressedCls',
        masked: {
            xtype: 'loadmask',
            message: lang.loading
        },
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [{
            xtype:'coursecontainer'
        }],
        plugins: [
        'pullrefresh', {
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: lang.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.publications.PublicationTpl')
    }
});