/**
 * @class Core
 * @extends --
 * This is the definition class utils of the application
 */
 Ext.define('Core.Utils', {
    user:undefined,
    url:'http://localhost:3000/api/',
    src:'/assets/Cursame/',
    requires: ['Ext.data.JsonP'],

    ajax :function(obj){
        var token = localStorage.getItem("token");
        obj.url = this.url + obj.url;
        if (token) {
            obj.params = Ext.applyIf({
                auth_token: token
            },obj.params);
        }
        var o = Ext.applyIf({
            disableCaching:false,
            method :'GET'//,
            // callbackKey: 'callback'
        },obj);
        Ext.data.JsonP.request(o);
        // Ext.data.JsonP.request(o);
    }
});

 var Core = Ext.create('Core.Utils');

