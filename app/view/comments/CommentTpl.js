/**
 * @class Cursame.view.comments.CommentTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the comments
 * @manduks
 */
Ext.define('Cursame.view.comments.CommentTpl', {
    extend: 'Ext.XTemplate',
    constructor: function () {
        var html;
        html = [
        '<div class="publication">',
            '<div class="content">',
                '<div class="tipe-line-comment"></div>',
                '<div class="header">',
                    '<div class="avatar">',
                        '<tpl if="this.validateUserAvatar(user_avatar) == true">',
                            '<img src="'+Cursame.URL+'{user_avatar}">',
                        '<tpl else>',
                            '<img src="'+Cursame.URL+'/assets/course-avatarx-0a909a23b940f3f1701b2e6065c29fe6.png">',
                        '</tpl>',
                    '</div> ',
                    '<div class="info-user">',
                        '{user_name}',
                        '<br> <p class="time">Hace una hora</p>',
                    '</div>',
                '</div>',
                '<div style="clear:both"></div>',
                '<div class="post">',
                    '<p>{comment_html}</p>',
                '</div>',
                '<div class="likes-comments">',
                    '<p>{likes} Me Gusta - {num_comments} Comentarios</p>',
                '</div>',
                '<div style="clear:both"></div>',
                '<div class="footer-publication">',
                    '<div class="like">Me gusta</div>',
                    '<div class="comment">Commentar</div>',
                '</div>',
            '</div>',
        '</div>', {
                validateUserAvatar: function (user_avatar) {
                    if (user_avatar !== null) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }];
        this.callParent(html);
    }
});