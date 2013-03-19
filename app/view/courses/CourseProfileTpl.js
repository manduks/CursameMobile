/**
 * @class Cursame.view.courses.CourseProfileTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the course profile
 * @manduks 
 */
 Ext.define('Cursame.view.courses.CourseProfileTpl', {
    extend: 'Ext.XTemplate',
    constructor: function () {
        var html;
        html = [
        '<div class="profile-header">',
            '<div class="img-header">',
                '<img src="{coverphoto}">',
            '</div>',
            '<div class="profile-info">',
                '<div class="profile-avatar"><img src="{avatar}"></div>',
                '<div class="aboutme-course"><b>{title}</b>',
                    '<p>{public_status}</p>',
                '</div>',
            '</div>',
        '</div>',
        '<div class="creation">',
            '<div class="create-comment">Comentario</div>',
            '<div class="create-homework">Tarea</div>',
            '<div class="create-discussion">Discusi&oacute;n</div>',
        '</div>',
        '<div class="clear:both"></div>'
        ];
        this.callParent(html);
    }
});