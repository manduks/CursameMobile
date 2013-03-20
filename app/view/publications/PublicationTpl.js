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
                    '<p>12 Me gusta</p><p>-</p><p>35 Comentarios</p>',
                '</div>',
                '<div style="clear:both"></div>',
                '<div class="footer-publication">',
                    '<div class="like">Me gusta</div>',
                    '<div class="comment">Commentar</div>',
                '</div>',
            '</div>',
        '</div>'
        ];
        this.callParent(html);
    }
});