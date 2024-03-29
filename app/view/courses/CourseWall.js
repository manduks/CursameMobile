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
            message: Core.Lang.es.loading
        },
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        plugins: [{
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: Core.Lang.es.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.publications.PublicationTpl')
    }
});