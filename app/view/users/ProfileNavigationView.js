/**
 * @author @l_nrique
 */
Ext.define('Cursame.view.users.ProfileNavigationView', {
    extend: 'Cursame.view.navigation.View',
    xtype: 'profilenavigationview',

    requires: [
        'Cursame.view.users.UserWall'
    ],
    config: {
        items: {
            xtype: 'userwall',
            title: Core.Lang.es.profile
        }
    }
});