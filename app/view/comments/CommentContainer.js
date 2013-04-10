/**
 * @class Cursame.view.comments.CommentContainer
 * @extends Ext.Container
 * This is the comment container
 * @manduks
 */
Ext.define('Cursame.view.comments.CommentContainer', {
    extend: 'Ext.Container',
    xtype: 'commentcontainer',
    requires: ['Cursame.view.comments.CommentTpl'],
    config: {
        docked: 'top',
        addedListener: false,
        tpl:[
        '<div class="publication">',
            '<div class="content">',
                '<div class="tipe-line-comment"></div>',
                '<div class="header">',
                    '<div class="avatar">',
                        //'<tpl if="this.validateUserAvatar(avatar) == true">',
                         // '<img src="'+Cursame.URL+'{avatar}">',
                        //'<tpl else>',
                            '<img src="'+Cursame.URL+'/assets/course-avatarx-0a909a23b940f3f1701b2e6065c29fe6.png">',
                        //'</tpl>',
                    '</div> ',
                    '<div class="info-user">',
                        '{user_name}',
                        '<br> <p class="time">Hace {timeAgo}</p>',
                    '</div>',
                '</div>',
                '<div style="clear:both"></div>',
                '<div class="post">',
                    '<p>{comment_html}</p>',
                '</div>',
                '<div class="likes-comments">',
                    '<p>{likes.length} Me gusta</p>',
                '</div>',
                '<div style="clear:both"></div>',
            '</div>',
        '</div>'].join('')
    }
});