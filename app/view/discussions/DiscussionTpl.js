/**
 * @class Cursame.view.discussions.DiscussionTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the discussion
 * @manduks 
 */
 Ext.define('Cursame.view.discussions.DiscussionTpl', {
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
                '<div class="aboutme"><b>{title}</b>',
                    '<p>{description}</p>',
                '</div>',
            '</div>',
        '</div>', {
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