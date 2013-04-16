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
                '<img src="{wall}">',
            '</div>',
            '<div class="profile-info">',
                '<div class="profile-avatar">',
                    '<img src="{avatar}">',
                '</div>',
                '<div class="aboutme"><b>{title}</b>',
                    '<p>{description}</p>',
                '</div>',
            '</div>',
        '</div>'
        ];
        this.callParent(html);
    }
});