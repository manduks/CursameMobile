/**
 * @class Cursame.view.courses.CoursesList
 * @extends Ext.List
 * This component show the wall of cursame app
 */
 Ext.define('Cursame.view.courses.CoursesList', {
    extend: 'Ext.List',
    xtype: 'courseslist',
    requires:['Cursame.view.courses.CourseTpl'],

    config: {
        store: 'Courses',
        pressedCls:'pressedCls',
        selectedCls :'pressedCls',
        masked: {
            xtype: 'loadmask',
            message: Core.Lang.es.loading
        },
        emptyText: 'No hay cursos ...',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        plugins: [{
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: Core.Lang.es.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.courses.CourseTpl')
    }
});