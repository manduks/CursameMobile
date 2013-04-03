/**
 * @class Cursame.view.notifications.NotificationsList
 * @extends Ext.List
 * This component show the list of notifications
 */
 Ext.define('Cursame.view.notifications.NotificationsList', {
    extend: 'Ext.List',
    xtype: 'notificationslist',
    requires:['Cursame.view.notifications.NotificationTpl'],

    config: {
        store: 'Notifications',
        pressedCls:'pressedCls',
        selectedCls :'pressedCls',
        masked: {
            xtype: 'loadmask',
            message: Core.Lang.es.loading
        },
        emptyText: 'No hay notificaciones ...',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        plugins: [{
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: Core.Lang.es.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.notifications.NotificationTpl')
    }
});