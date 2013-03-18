/**
 * @class Cursame.store.Courses
 * @extends Core.data.Store
 * This is the store to handle the Courses
 */
Ext.define('Cursame.store.Courses', {
    extend: 'Core.data.Store',
    requires:['Cursame.model.Course'],
    config:{
		model:'Cursame.model.Course',
		autoLoad:false
    }
});