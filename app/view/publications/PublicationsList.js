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
        //ui:'publication',
        masked: {
            xtype: 'loadmask',
            message: lang.loading
        },
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        plugins: [
            'pullrefresh', {
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: lang.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.publications.PublicationTpl')
    }
});