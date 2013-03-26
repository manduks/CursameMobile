/**
 * @class Cursame.view.deliveries.DeliveryTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the delivery
 * @manduks 
 */
 Ext.define('Cursame.view.deliveries.DeliveryTpl', {
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
                '<div class="aboutme-course"><b>{title}</b> ({end_date})',
                    '<p>{description}</p>',
                '</div>',
            '</div>',
        '</div>',
        '<div class="clear:both"></div>'
        ];
        this.callParent(html);
    }
});