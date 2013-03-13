/**
 * @class Cursame.view.publications.PublicationTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the publications
 * @manduks 
 */
Ext.define('Cursame.view.publications.PublicationTpl', {
    extend: 'Ext.XTemplate',
    constructor: function (container) {
        var html;
        html = [
        '<div class="publication">',
           '{publication_type}',
        '</div>'
        ];
        this.callParent(html);
    }
});