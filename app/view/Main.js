/**
 * @class Cursame.view.Main
 * @extends Ext.Container
 * This is the main view of the cursame app
 * @manduks
 */
Ext.define('Cursame.view.Main', {
    extend: 'Ext.Container',
    xtype:'main',

    requires:[
		'Ext.plugin.PullRefresh',
		'Ext.plugin.ListPaging',
		'Cursame.view.publications.PublicationTpl',
		'Cursame.view.comments.CommentTpl',
		'Cursame.view.users.UserProfileTpl',
		'Cursame.view.courses.CourseTpl',
		'Cursame.view.courses.CourseProfileTpl',
		'Cursame.view.discussions.DiscussionTpl',
        'Cursame.view.deliveries.DeliveryTpl',
        'Cursame.view.notifications.NotificationTpl',
        'Cursame.view.comments.CommentCommentTpl'
    ],
    config: {
        layout: 'card',
        fullscreen: true,
        autoDestroy: false,
        activeItem:0
    }
});
