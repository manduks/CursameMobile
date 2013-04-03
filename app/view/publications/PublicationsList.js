/**
 * @class Cursame.view.publications.PublicationsList
 * @extends Ext.List
 * This component show the wall of cursame app
 */
 Ext.define('Cursame.view.publications.PublicationsList', {
    extend: 'Ext.List',
    xtype: 'publicationslist',
    requires:['Cursame.view.publications.PublicationTpl'],

    config: {
        store: 'Publications',
        pressedCls:'pressedCls',
        selectedCls :'pressedCls',
        masked: {
            xtype: 'loadmask',
            message: Core.Lang.es.loading
        },
        emptyText: 'No hay publicaciones ...',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        plugins: [{
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: Core.Lang.es.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.publications.PublicationTpl')
    }
});