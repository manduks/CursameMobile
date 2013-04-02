/**
 * @class Cursame.view.publications.PublicationTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the publications
 * @manduks 
 */
 Ext.define('Cursame.view.publications.PublicationTpl', {
    extend: 'Ext.XTemplate',
    constructor: function () {
        var html;
        html = [
        '<tpl if = "this.isFirstRecord(values) == true && showHeader">',
        '<div class="profile-header">',
            '<div class="img-header">',
                '<img src="'+Cursame.URL+'/assets/imagecoursex.png">',
            '</div>',
            '<div class="profile-info">',
                '<div class="profile-avatar">',
                    '<img src="{headerAvatar}">',
                '</div>',
                '<div class="aboutme-course"><b>{headerTitle}</b>',
                    '<p>{headerPublicStatus}</p>',
                '</div>',
            '</div>',
        '</div>',
        '<tpl if="this.hasPermissions() == true">',
            '<div class="creation">',
                '<div class="create-comment">Comentario</div>',
                '<div class="create-homework">Tarea</div>',
                '<div class="create-discussion">Discusi&oacute;n</div>',
            '</div>',
        '</tpl>',
        '<div class="clear:both"></div>',
        '</tpl>',
        '<tpl if = "!emptyStore">',
        '<div class="publication">',
            '<div class="content">',
                '<div class="tipe-line-{publication_type}"></div>',
                '<div class="header">',
                    '<div class="avatar">',
                        '<img src="{avatar}">',
                    '</div> ',
                    '<div class="info-user">',
                        '{title}',
                        '<br> <p class="time">Hace {created}</p>',
                    '</div>',
                '</div>',
                '<div style="clear:both"></div>',
                '<div class="post">',
                    '<p>{content}</p>',
                    // '<img src="http://1.bp.blogspot.com/-L3PW_oxd7wE/TlPVPK50HwI/AAAAAAAALn8/RN4UpwowJek/s1600/Paisaje-Monta%25C3%25B1a-1600x1200.jpg">',
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
        '</div>',
        '</tpl>',
            {
                hasPermissions: function () {
                    var user = Ext.decode(localStorage.getItem("User"));
                    if (user.roles[0].id != 2) {
                        return true;
                    }
                    return false;
                },
                isFirstRecord: function (values){
                    var record = Ext.getStore('Publications').getAt(0);

                    if (record.internalId == values.id){
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ];
        this.callParent(html);
    }
});