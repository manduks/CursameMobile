/**
 * @class Cursame.store.Users
 * @extends Core.data.Store
 * This is the store to handle the Users
 */
Ext.define('Cursame.store.Users', {
    extend: 'Core.data.Store',
    requires:['Cursame.model.User'],
    config:{
		model:'Cursame.model.User',
		//setup the grouping functionality to group by the first letter of the firstName field
        grouper: {
            groupFn: function(record) {
                var user = '';
                if (record.get('last_name')){
                    user = record.get('last_name')[0].toUpperCase();
                }
                return user;
            }
        },
		pageSize: 100,
		//filter the data using the firstName field
        sorters: 'last_name'
    }
});