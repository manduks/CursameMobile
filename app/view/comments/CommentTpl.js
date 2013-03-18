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
                        '<img src="{user_avatar}">',
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
                    '<p>12 Me gusta</p>',
                '</div>',
                '<div style="clear:both"></div>',
                '<div class="footer-publication">',
                    '<div class="like">Me gusta</div>',
                '</div>',
            '</div>',
        '</div>'];
        this.callParent(html);
    }
});