/**
 * @class Cursame.view.tablet.NavigationMenu
 * @extends Ext.List
 * This component show the wall of cursame app
 */
 Ext.define('Cursame.view.tablet.NavigationMenu', {
    extend: 'Ext.List',
    xtype: 'navigationmenu',
    config: {
        itemTpl: '<div class="contact"><strong>{name}</strong></div>',
        store: Ext.create('Ext.data.Store', {
         fields: ['name','group'],
         grouper: {
             groupFn: function(record) {
                 return record.get('group');
             },
             sortProperty: 'group',
             direction: "DESC"
         }
     }),
        grouped: true
    }
});