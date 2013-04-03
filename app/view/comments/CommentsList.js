/**
 * @class Cursame.view.comments.CommentsList
 * @extends Ext.List
 * Esta es la lista que muestra los comentarios
 * @manduks
 */
Ext.define('Cursame.view.comments.CommentsList', {
    extend: 'Ext.List',
    xtype: 'commentslist',

    requires: ['Cursame.view.comments.CommentTpl', 'Cursame.view.comments.CommentBar'],

    config: {
        store: 'Comments',
        pressedCls:'pressedCls',
        selectedCls :'pressedCls',
        masked: {
            xtype: 'loadmask',
            message: Core.Lang.es.loading
        },
        emptyText: 'No hay comentarios ...',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [{
            xtype: 'commentbar'
        }],
        plugins: [{
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: Core.Lang.es.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.comments.CommentTpl')
    }
});