/**
 * @class Cursame.store.Notifications
 * @extends Core.data.Store
 * This is the store to handle the Notifications
 */
Ext.define('Cursame.store.Notifications', {
    extend: 'Core.data.Store',
    requires:['Cursame.model.Notification'],
    config:{
		model:'Cursame.model.Notification',
		autoLoad:false
    }
});