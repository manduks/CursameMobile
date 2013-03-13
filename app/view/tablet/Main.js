/**
 * @class Cursame.view.tablet.Main
 * @extends Cursame.view.Main
 * This is the view class for our tablet application
 */
 Ext.define('Cursame.view.tablet.Main', {
    extend: 'Cursame.view.Main',
    requires: ['Cursame.view.LoginForm','Cursame.view.publications.PublicationsList'],

    config: {
        items: [{
            xtype: 'loginform'
        }, {
            xtype:'container',
            layout:'hbox',
            items:[{
                xtype:'panel',
                title:'menu',
                style:'background-color: #00282E;',
                flex:1,
                items:[{
                    xtype : 'titlebar',
                    docked: 'top',
                    items: {
                        xtype : 'button',
                        align : 'right',
                        ui    : 'action',
                        text  : 'Publicaciones',
                        handler:function(){
                            Ext.getStore('Publications').load();
                        }
                    }
                }]

            },{
                xtype:'publicationslist',
                title:lang.home,
                flex:4
            }]
        }]
    }
});