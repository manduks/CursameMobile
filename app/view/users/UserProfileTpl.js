/**
 * @class Cursame.view.users.UserProfileTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the user profile
 * @manduks 
 */
 Ext.define('Cursame.view.users.UserProfileTpl', {
    extend: 'Ext.XTemplate',
    constructor: function () {
        var html;
        html = [
        '<div class="profile-header">',
            '<div class="img-header">',
                 '<tpl if="this.validateWall(wall) == true">',
                     '<img src="{wall}">',
                 '<tpl else>',
                    '<img src="{wall}'+'/assets/portada.png">',
                 '</tpl>',
            '</div>',
            '<div class="profile-info">',
                '<div class="profile-avatar">',
                    '<tpl if="this.validateAvatar(avatar) == true">',
                        '<img src="{avatar}">',
                    '<tpl else>',
                        '<img src="{avatar}'+'/assets/course-avatarx-0a909a23b940f3f1701b2e6065c29fe6.png">',
                    '</tpl>',
                '</div>',
                '<div class="aboutme"><b>{name}</b>',
                    '<p>{bios}</p>',
                '</div>',
            '</div>',
        '</div>', {
                validateWall: function (wall) {
                    if (wall !== null) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },{
                validateAvatar: function (avatar) {
                    if (avatar !== null) {
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