/**
 * @class Cursame.view.courses.CourseTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the courses
 * @manduks
 */
Ext.define('Cursame.view.courses.CourseTpl', {
    extend: 'Ext.XTemplate',
    constructor: function () {
        var html;
        html = [
        '<div class="publication">',
            '<div class="content">',
                '<div class="tipe-line-course"></div>',
                '<div class="header">',
                    '<div class="avatar">',
                        '<tpl if="this.validateAvatar(avatar) == true">',
                            '<img src="'+Cursame.URL+'{avatar}">',
                        '<tpl else>',
                            '<img src="'+Cursame.URL+'/assets/course-avatarx-0a909a23b940f3f1701b2e6065c29fe6.png">',
                        '</tpl>',
                    '</div> ',
                    '<div class="info-user">',
                        '{title}',
                        '<br> <p class="time">Publico</p>',
                    '</div>',
                '</div>',
                '<tpl if="this.canDelete(values) == true">',
                '<div class="delete">',
                '<a href="#">X</a>',
                '</div>',
                '</tpl>',
                '<div style="clear:both"></div>',
                '<div class="post">',
                    '<p>{silabus}</p>',
                '</div>',
                '<div style="clear:both"></div>',
            '</div>',
        '</div>', {
                validateAvatar: function (avatar) {
                    if (avatar !== null) {
                        return true;
                    } else {
                        return false;
                    }
                },
                canDelete: function (values) {
                    var canDelete = false,
                        user = Ext.decode(localStorage.getItem("User"));

                    if (user.roles[0].id == 1 || user.roles[0].id == 4) {
                        return true;
                    }
                    Ext.each(values.members_in_courses, function (member) {
                        if (member.owner && member.user_id == user.id) {
                            return canDelete = true;
                        }
                    }, this);
                    return canDelete;
                }
            }];
        this.callParent(html);
    }
});