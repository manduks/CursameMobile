/**
 * @class Cursame.view.users.UserTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the users
 * @manduks 
 */
 Ext.define('Cursame.view.users.UserTpl', {
    extend: 'Ext.XTemplate',
    constructor: function () {
        var html;
        html = [
            '<div class="users">',
                '<div class="avatar">',
                    '<tpl if="this.validateAvatar(avatar) == true">',
                        '<img src="'+Cursame.URL+'{avatar}">',
                    '<tpl else>',
                        '<img src="'+Cursame.URL+'/assets/imagex-c0ba274a8613da88126e84b2cd3b80b3.png">',
                    '</tpl>',
                '</div>',
                '<div class="name">',
                    '{first_name} {last_name}',
                '</div>',
            '</div>', {
                validateAvatar: function (avatar) {
                    if (avatar !== null) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }];
        this.callParent(html);
    }
});