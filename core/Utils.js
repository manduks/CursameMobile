/**
 * @class Core
 * @extends --
 * This is the definition class utils of the application
 */
 Ext.define('Core.Utils', {
    singleton:true,
    user:undefined,
    url:Cursame.APIURL,
    src:'/assets/Cursame/',
    requires: ['Ext.data.JsonP'],
    pageSize: 4,
    hideMenu:false,

    ajax :function(obj){
        var token = localStorage.getItem("Token");
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
    },
    toFirstUpperCase:function  (txt) {
        return txt.charAt(0).toUpperCase()+txt.slice(1);
    },
    timeAgo: function (date) {
        try {
            var now = Math.ceil(Number(new Date()) / 1000),
            dateTime = Math.ceil(Number(new Date(date)) / 1000),
            diff = now - dateTime,
            str;

            if (diff < 0){
                diff = diff * -1;
            }
            if (diff < 60) {
                return String(diff) + ' segundos';
            } else if (diff < 3600) {
                str = String(Math.ceil(diff / (60)));
                return str + (str == "1" ? ' minutos' : ' minutos');
            } else if (diff < 86400) {
                str = String(Math.ceil(diff / (3600)));
                return str + (str == "1" ? ' horas' : ' horas');
            } else if (diff < 60 * 60 * 24 * 365) {
                str = String(Math.ceil(diff / (60 * 60 * 24)));
                return str + (str == "1" ? ' días' : ' días');
            } else {
                return Ext.Date.format(new Date(date), 'jS M \'y');
            }
        } catch (e) {
            return '';
        }
    }
});

