/**
 * @class Cursame.view.assignments.AssignmentsList
 * @extends Ext.List
 * This component show the list of assignments
 */
Ext.define('Cursame.view.assignments.AssignmentsList', {
    extend: 'Ext.List',
    xtype: 'assignmentslist',
    requires:['Cursame.view.assignments.AssignmentTpl'],

    config: {
        store: 'Assignments',
        pressedCls:'pressedCls',
        selectedCls :'pressedCls',
        masked: {
            xtype: 'loadmask',
            message: Core.Lang.es.loading
        },
        emptyText: 'No hay entregas ...',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        plugins: [{
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: Core.Lang.es.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.assignments.AssignmentTpl')
    }
});