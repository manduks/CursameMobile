/**
 * @class Cursame.view.tablet.Main
 * @extends Cursame.view.Main
 * This is the view class for our tablet application
 */
 Ext.define('Cursame.view.tablet.Main', {
    extend: 'Cursame.view.Main',
    requires: [
        'Cursame.view.LoginForm',
        'Cursame.view.publications.PublicationsList',
        'Cursame.view.comments.CommentsPanel',
        'Cursame.view.tablet.NavigationMenu',
        'Cursame.view.users.UserWall',
        'Cursame.view.courses.CourseNavigationView'
    ],

    config: {
        items: [{
            xtype: 'loginform'
        }, {
            xtype:'container',
            layout:'hbox',
            items:[{
                xtype : 'titlebar',
                docked: 'top',
                title : 'Cursame',
                items: {
                    xtype : 'button',
                    id: 'viewSourceButton',
                    hidden: true,
                    align : 'right',
                    ui    : 'action',
                    action: 'viewSource',
                    text  : 'Source'
                }
            },{
                xtype:'navigationmenu',
                flex:1
            },{
                xtype:'container',
                itemId:'cardcontainer',
                layout:'card',
                activeItem:0,
                items:[{
                    xtype:'userwall'
                },{
                    xtype:'publicationslist'
                },{
                    xtype:'coursenavigationview'
                }],
                flex:4
            }]
        }]
    }
});