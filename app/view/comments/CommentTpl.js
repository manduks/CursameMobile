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
            '<tpl if = "this.isFirstRecord(values) == true">',
                '<div class="profile-header">',
                    '<div class="img-header">',
                        '<img src="{headerWall}">',
                    '</div>',
                '<div class="profile-info">',
                    '<div class="profile-avatar">',
                        '<img src="{headerAvatar}">',
                    '</div>',
                '<div class="aboutme"><b>{headerName}</b>',
                    '<p>{headerBios}</p>',
                '</div>',
            '</div>',
            '</div><br>',
            '</tpl>',
        '<tpl if = "!emptyStore">',
            '<div class="publication">',
            '<div class="content">',
                '<div class="tipe-line-comment"></div>',
                '<div class="header">',
                    '<div class="avatar">',
                        '<tpl if="this.validateUserAvatar(user_avatar) == true">',
                            '<img src="'+Cursame.URL+'{user_avatar}">',
                        '<tpl else>',
                            '<img src="'+Cursame.URL+'/assets/imagex-c0ba274a8613da88126e84b2cd3b80b3.png">',
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
                        '<p>{likes.length} Me Gusta - {num_comments} Comentarios</p>',
                '</div>',
                '<div style="clear:both"></div>',
                '<div class="footer-publication">',
                '<tpl if ="this.validateLike(values) == true">',
                    '<div class="like">Me gusta</div>',
                '<tpl else>',
                    '<div class="like">Ya no me gusta</div>',
                '</tpl>',
                    '<div class="comment">Commentar</div>',
                '</div>',
            '</div>',
         '</div>',
        '</tpl>', {
                validateUserAvatar: function (user_avatar) {
                    if (user_avatar !== null) {
                        return true;
                    } else {
                        return false;
                    }
                },
                isFirstRecord: function (values){
                    var record = Ext.getStore('Comments').getAt(0);
                    if (record.internalId == values.id){
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