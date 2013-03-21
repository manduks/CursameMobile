Ext.define('Cursame.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: {
                selector: 'main'
            }
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