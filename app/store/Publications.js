/**
 * @class Cursame.store.Publications
 * @extends Core.data.Store
 * @manduks
 */
Ext.define('Cursame.store.Publications', {
    extend: 'Core.data.Store',
	requires: ['Cursame.model.Publication'],
    
    config: {
        model: 'Cursame.model.Publication',
        autoLoad:false
    }
});