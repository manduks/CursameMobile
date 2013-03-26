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
                        '<img src="'+Cursame.URL+'{avatar}">',
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
                    '<p>12 Me gusta</p>',
                '</div>',
                '<div style="clear:both"></div>',
            '</div>',
        '</div>'].join('')
    }
});