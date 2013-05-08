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
                        '<img src="'+Cursame.URL+'/assets/imagex-c0ba274a8613da88126e84b2cd3b80b3.png">',
                    '</tpl>',
                '</div>',
                '<tpl if="this.canDelete(values) == true">',
                '<div class="delete">',
                '<a href="#">X</a>',
                '</div>',
                '<tpl else>',
                '<div class="nodelete"><p>&nbsp;</p></div>',
                '</tpl>',
                '<div class="comment-name">',
                    '{user_name}',
                '</div>',
                '<div class="post-comment">',
                    '<p>{comment_html}</p>',
                '</div><br><div class="comment-time">{likes.length} Me Gusta - hace {created}',
                '<tpl if ="this.validateLike(values) == true">',
                '<div class="comment-like">Me gusta</div>',
                '<tpl else>',
                '<div class="comment-dislike">Ya no me gusta</div>',
                '</tpl></div>',
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

                },
                canDelete:function(values){
                    var user = Ext.decode(localStorage.getItem("User"));
                    if((values.user && user.id == values.user.id)
                        || (user.roles[0].id == 1 || user.roles[0].id == 4)) {
                        return true;
                    }
                    return false;
                }
            }];
        this.callParent(html);
    }
});