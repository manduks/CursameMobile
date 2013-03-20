Ext.define('Cursame.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: {
                selector: 'main'
            },
            menu: 'navigationmenu'
        }
    },
    launch: function () {
        var object,userName, me = this;
        if (localStorage.getItem("Token")) {
            me.getMain().setActiveItem(1);
            object = Ext.decode(localStorage.getItem("User"));
            userName = object.first_name + ' ' + object.last_name;
            me.getMenu().setData([{
                    name: userName,
                    group: 'PERFIL'
                }, {
                    name: 'Últimas noticias',
                    group: 'MURO'
                }, {
                    name: 'Cursos',
                    group: 'CURSOS'
                }, {
                    name: 'Salir',
                    group: 'AVANZADO'
                }
            ]);
            //activamos las publicaciones
            me.getCardContainer().animateActiveItem(1, {
                type: 'slide',
                direction: 'left'
            });
            Ext.getStore('Publications').load();
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