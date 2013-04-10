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
                    '<tpl if="this.validateUserAvatar(user_avatar) == true">',
                        '<img src="'+Cursame.URL+'{user_avatar}">',
                    '<tpl else>',
                        '<img src="'+Cursame.URL+'/assets/course-avatarx-0a909a23b940f3f1701b2e6065c29fe6.png">',
                    '</tpl>',
                '</div>',
                '<div class="comment-name">',
                    '{user_name}',
                '</div>',
                '<tpl if ="this.validateLike(values) == true">',
                '<div class="comment-like">Me gusta</div>',
                '<tpl else>',
                '<div class="comment-dislike">Ya no me gusta</div>',
                '</tpl>',
                '<div class="post-comment">',
                    '<p>{comment_html}</p>',
                '</div><br><div class="comment-time">{likes.length} Me Gusta - hace {created}</div>',
                //'<div class="comment-time">{likes.length} Me Gusta hace 1 hora</div>',
                '<div style="clear:both"></div>',
            '</div>', {
                validateUserAvatar: function (user_avatar) {
                    if (user_avatar !== null) {
                        return true;
                    } else {
                        return false;
                    }
                },
                validateLike: function (values){
                var user = Ext.decode(localStorage.getItem("User")),
                    bandera = true;
                if (values && values.likes){
                    Ext.Array.each(values.likes, function(item,index){
                    if (item.voter_id == user.id){
                        bandera = false;
                    }
                    });
                }
                return bandera;

                }
            }];
        this.callParent(html);
    }
});