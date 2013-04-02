/**
 * @class Cursame.view.users.UserContainer
 * @extends Ext.List
 * This component is the user container for the wall
 * @manduks
 */
Ext.define('Cursame.view.users.UserContainer', {
    extend: 'Ext.Container',
	xtype:'usercontainer',
	requires:['Cursame.view.users.UserProfileTpl'],

    config: {
		//docked: 'top',
		tpl: Ext.create('Cursame.view.users.UserProfileTpl')
    }
});