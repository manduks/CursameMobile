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
                    hidden:Ext.os.is('Android') || !Core.Utils.hideMenu,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                }
            ]
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
