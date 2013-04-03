/**
 * @class Cursame.view.users.UsersList
 * @extends Ext.List
 * This component show the wall of cursame app
 */
 Ext.define('Cursame.view.users.UsersList', {
    extend: 'Ext.List',
    xtype: 'userslist',
    requires:['Cursame.view.users.UserTpl'],

    config: {
        store: 'Users',
        pressedCls:'pressedCls',
        selectedCls :'pressedCls',
        masked: {
            xtype: 'loadmask',
            message: Core.Lang.es.loading
        },
        emptyText: 'No hay usuarios ...',
        disclosure: true,
        grouped: true,
        indexBar: true,
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        plugins: [{
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: Core.Lang.es.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.users.UserTpl')
    }
});