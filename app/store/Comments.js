/**
 * @class Cursame.store.Comments
 * @extends Core.data.Store
 * This is the store to handle the comments
 */
Ext.define('Cursame.store.Comments', {
    extend: 'Core.data.Store',
    requires:['Cursame.model.Comment'],
    config:{
		model:'Cursame.model.Comment',
		autoLoad:false
    }
});