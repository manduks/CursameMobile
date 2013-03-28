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
            message: lang.loading
        },
        emptyText: 'No hay usuarios ...',
        disclosure: true,
        grouped: true,
        indexBar: true,
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        plugins: [
        'pullrefresh', {
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: lang.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.users.UserTpl')
    }
});