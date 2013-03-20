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
                '<img src="'+Cursame.URL+'{wall}">',
            '</div>',
            '<div class="profile-info">',
                '<div class="profile-avatar"><img src="'+Cursame.URL+'{avatar}"></div>',
                '<div class="aboutme"><b>{name}</b>',
                    '<p>{bios}</p>',
                '</div>',
            '</div>',
        '</div>'
        ];
        this.callParent(html);
    }
});