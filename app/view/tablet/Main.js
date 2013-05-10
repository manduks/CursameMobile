/**
 * @class Cursame.view.tablet.Main
 * @extends Cursame.view.Main
 * This is the view class for our tablet application
 */
 Ext.define('Cursame.view.tablet.Main', {
    extend: 'Cursame.view.Main',
    requires: [
        'Ext.field.TextArea',
        'Ext.field.DatePicker',
        'Ext.field.Number',
        'Ext.MessageBox',
        'Cursame.view.LoginForm',
        'Cursame.view.navigation.View',
        'Cursame.view.users.ProfileNavigationView',
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
        'Cursame.view.users.UserNavigationView',
        'Cursame.view.assignments.AssignmentsList',
        'Cursame.view.assignments.AssignmentCalificationForm'
    ],
     config:{
         menu:{
             minWidth:190
         }
     },

     initialize:function(){
         var me = this,
             cardContainerItems = [{
                 xtype:'profilenavigationview'
             },{
                 xtype:'publicationsnavigationview'
             },{
                 xtype:'notificationnavigationview'
             },{
                 xtype:'coursenavigationview'
             },{
                 xtype:'usernavigationview'
             }],
             navigationMenu = {
                 xtype:'navigationmenu',
                 flex:1
             },
             cardContainer = {
                 xtype:'container',
                 itemId:'cardcontainer',
                 layout:'card',
                 flex:4,
                 activeItem:0,
                 items:cardContainerItems
             };

         if(Core.Utils.hideMenu){
             navigationMenu = {
                 xtype:'navigationmenu',
                 docked: 'left',
                 cls: 'x-slidenavigation-list',
                 style: 'position: absolute; top: 0; left: 0; height: 100%; z-index: 2',
                 width: me.getMenu().minWidth
             };
             cardContainer = {
                 xtype:'container',
                 itemId:'cardcontainer',
                 layout:'card',
                 cls: 'x-slidenavigation-container',
                 style: 'width: 100%; height: 100%; position: absolute; opacity: 1; z-index: 5',
                 draggable: {
                     direction: 'horizontal',
                     constraint: {
                         min: { x: 0, y: 0 },
                         max: { x: Math.max(screen.width, screen.height), y: 0 }
                     },
                     listeners: {
                         dragend: function(draggable, e, eOpts){me.down('#cardcontainer').fireEvent('dragend', draggable, e)},
                         scope:   me
                     }
                 },
                 activeItem:0,
                 items:cardContainerItems
             };
         }

         me.setItems([{
             xtype: 'loginform'
         }, {
             xtype:'container',
             layout:'hbox',
             items:[navigationMenu,cardContainer]
         }]);

         me.callParent();
     }
});