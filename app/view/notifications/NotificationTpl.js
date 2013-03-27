/**
 * @class Cursame.view.notifications.NotificationTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the notifications
 * @manduks
 */
Ext.define('Cursame.view.notifications.NotificationTpl', {
    extend: 'Ext.XTemplate',
    constructor: function () {
        var html;
        html = [
        '<div class="notification">',
            '{text}',
        '</div>'];
        this.callParent(html);
    }
});