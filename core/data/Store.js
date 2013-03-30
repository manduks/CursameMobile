/**
 * @class Core.data.Store
 * @extends Ext.data.Store
 * This is the Notifications store of Cursame
 */
Ext.define('Core.data.Store', {
    extend: 'Ext.data.Store',

    params: {},
    resetParams: undefined,
    config: {
        pageSize: Cursame.pageSize,
        listeners: {
            beforeload: function (store, operation, ops) {
                var me = this,
                    extraParams = store.getProxy().getExtraParams();
                me.params.auth_token = localStorage.getItem("Token");
                if(me.resetParams){
                    store.getProxy().setExtraParams(me.params);
                    me.resetParams = false;
                } else {
                    store.getProxy().setExtraParams(me.mergePropertiesObject(extraParams, me.params));
                }

            }
        }
    },

    resetCurrentPage: function() {
        this.currentPage = 1;
    },

    setParams:function(params, resetParams){
        var me = this;
        me.params = params;
        me.resetParams = resetParams;
    },

    mergePropertiesObject: function (obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    }
});