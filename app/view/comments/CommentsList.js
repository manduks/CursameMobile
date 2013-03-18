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
            message: lang.loading
        },
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [{
            xtype: 'commentbar'
        }],
        plugins: [
        'pullrefresh', {
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: lang.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.comments.CommentTpl')
    }
});