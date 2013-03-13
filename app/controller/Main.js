Ext.define('Cursame.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: {
                selector: 'main'
            }
        }
    },
    launch: function () {
        if (localStorage.getItem("Token")) {
            this.getMain().setActiveItem(1);
            //Ext.getStore('Publications').load();            
        }
    },
    mask: function (msg) {
        var me = this;
        if (msg) {
            me.getMain().setMasked({
                xtype: 'loadmask',
                message: msg
            });
        } else {
            me.getMain().setMasked(false);
        }
    }
});