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
                '<img src="'+Cursame.URL+'/assets/imagecoursex.png">',
            '</div>',
            '<div class="profile-info">',
                '<div class="profile-avatar">',
                    '<tpl if="this.validateAvatar(avatar) == true">',
                        '<img src="'+Cursame.URL+'{avatar}">',
                    '<tpl else>',
                        '<img src="'+Cursame.URL+'/assets/course-avatarx-0a909a23b940f3f1701b2e6065c29fe6.png">',
                    '</tpl>',
                '</div>',
                '<div class="aboutme-course"><b>{title}</b>',
                    '<p>{public_status}</p>',
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
        {
            validateAvatar: function (avatar) {
                if (avatar !== null) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            hasPermissions: function () {
                var user = Ext.decode(localStorage.getItem("User"));
                if (user.roles[0].id != 2) {
                    return true;
                }
                return false;
            }
        }];

        this.callParent(html);
    }
});