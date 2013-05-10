/**
 * @class Cursame.store.Assignments
 * @extends Core.data.Store
 * This is the store to handle the assignments
 */
Ext.define('Cursame.store.Assignments', {
    extend: 'Core.data.Store',
    requires:['Cursame.model.Assignment'],
    config:{
        model:'Cursame.model.Assignment',
        autoLoad:false
    }
});