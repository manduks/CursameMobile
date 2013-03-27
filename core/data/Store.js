/**
 * @class Core.data.Store
 * @extends Ext.data.Store
 * This is the Notifications store of Cursame
 */
Ext.define('Core.data.Store', {
    extend: 'Ext.data.Store',

    config: {
        pageSize: Cursame.pageSize,
        listeners: {
            beforeload: function (store, operation, ops) {
                store.getProxy().setExtraParams({
                    auth_token: localStorage.getItem("Token")
                });
            }
        }
    },

    resetCurrentPage: function() {
        console.info(this.currentPage);
        this.currentPage = 1;
    }
});