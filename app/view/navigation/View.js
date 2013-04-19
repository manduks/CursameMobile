/**
 * @class Cursame.view.courses.CourseNavigationView.js
 * @extends Ext.navigation.View
 * The navigation view of the cursame courses, this is to navigate between the  courses
 * @author @l_nrique
 */
Ext.define('Cursame.view.navigation.View', {
    extend: 'Ext.navigation.View',
    xtype: 'navigationview',

    config: {
        defaultBackButtonText: Core.Lang.es.back,
        navigationBar: {
            items: [
                {
                    xtype: 'button',
                    action:'menuButton',
                    text:'<div class="button-menu">|||</div>',
                    ui:'action',
                    iconAlign:'center',
                    align: 'left',
                    hidden:!Core.Utils.hideMenu
                }
            ]
        },
        layout: {
            type: 'card',
            animation: Ext.os.is.Android ? false : {
                duration: 300,
                easing: 'ease-out',
                type: 'slide',
                direction: 'left'
            }
        },
        listeners:{
            scope:this,
            push:function(t, view, eOpts){
                if(Ext.os.is.Android){
                    view.doRefresh();
                }
            }
        }
    },
    applyLayout: function(config) {
        config = config || {};
        if (Ext.os.is.Android) {
            config.animation = false;
        }
        return config;
    }
});
