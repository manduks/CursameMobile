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
                    '<img src="'+Cursame.URL+'{avatar}">',
                '</div>',
                '<div class="name">',
                    '{first_name} {last_name}',
                '</div>',
            '</div>'
        ];
        this.callParent(html);
    }
});