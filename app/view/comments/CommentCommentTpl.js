/**
 * @class Cursame.view.comments.CommentCommentTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the commentsComments
 * @l_nrique
 */
Ext.define('Cursame.view.comments.CommentCommentTpl', {
    extend: 'Ext.XTemplate',
    constructor: function () {
        var html;
        html = [
            '<div class="comments">',
                '<div class="avatar-comment">',
                    '<img src="{user_avatar}">',
                '</div>',
                '<div class="comment-name">',
                    '{user_name}',
                '</div>',
                '<div class="post-comment">',
                    '<p>{comment_html}</p>',
                '</div>',
                '<div class="comment-like">Me gusta</div>',
                '<div class="comment-time">hace 1 hora</div>',
                '<div style="clear:both"></div>',
            '</div>'
            ];
        this.callParent(html);
    }
});