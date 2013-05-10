/**
 * @class Cursame.view.deliveries.DeliveryTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the delivery
 * @manduks 
 */
 Ext.define('Cursame.view.deliveries.DeliveryTpl', {
    extend: 'Ext.XTemplate',
    constructor: function () {
        var html,
            user = Ext.decode(localStorage.getItem("User")),
            role = user && user.roles[0]? user.roles[0].id: 0,
            entrega = role==3?'Entregas':'Entregar';

        html = [
        '<div class="profile-header">',
            '<div class="img-header">',
                '<img src="'+Cursame.URL+'/assets/imagecoursex.png">',
            '</div>',
            '<div class="profile-info">',
                '<div class="menu-homework">',
                    '<div class="aboutme-homework description"><b>Descripci&oacute;n</b> <br><i>"{title}"</i> </div>',
                     '<div class="aboutme-homework date">Entregar en:<br> <b>{end_date}</b></br></div>',
                     '<div class="aboutme-homework deliver"><b>'+entrega+'</b></br></div>',
                '</div>',
            '</div>',
        '</div>',
        '<div class="clear:both"></div>'
        ];
        this.callParent(html);
    }
});