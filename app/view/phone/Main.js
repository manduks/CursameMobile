/**
 * @class Cursame.view.phone.Main
 * @extends Cursame.view.Main
 * This is the view class for our phone application
 */
 Ext.define('Cursame.view.phone.Main', {
    extend: 'Cursame.view.Main',
    requires: [
        'Ext.field.TextArea',
        'Ext.field.DatePicker',
        'Ext.field.Number',
        'Ext.MessageBox',
        'Cursame.view.LoginForm',
        'Cursame.view.publications.PublicationNavigationView',
        'Cursame.view.publications.PublicationsList',
        'Cursame.view.comments.CommentsPanel',
        'Cursame.view.tablet.NavigationMenu',
        'Cursame.view.users.UserWall',
        'Cursame.view.courses.CourseNavigationView',
        'Cursame.view.comments.CommentForm',
        'Cursame.view.deliveries.DeliveryForm',
        'Cursame.view.discussions.DiscussionForm',
        'Cursame.view.discussions.DiscussionWall',
        'Cursame.view.deliveries.DeliveryWall',
        'Cursame.view.comments.CommentWall',
        'Cursame.view.notifications.NotificationNavigationView',
        'Cursame.view.users.UserNavigationView'
    ],

    config: {
        items: [{
            xtype: 'loginform'
        }, {
            xtype:'container',
            layout:'hbox',
            items:[
            {
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
                    xtype:'publicationsnavigationview'
                },{
                    xtype:'notificationnavigationview'
                },{
                    xtype:'coursenavigationview'
                },{
                    xtype:'usernavigationview'
                }],
                flex:4
            }]
        }]
    }
});