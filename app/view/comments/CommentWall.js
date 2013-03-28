/**
 * @class Cursame.view.comments.CommentWall
 * @extends Ext.List
 * Este es el wall del comentario
 * @manduks
 */
Ext.define('Cursame.view.comments.CommentWall', {
    extend: 'Ext.List',
    xtype: 'commentwall',

    requires: ['Cursame.view.comments.CommentTpl', 'Cursame.view.comments.CommentBar','Cursame.view.comments.CommentContainer'],

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
            xtype:'commentcontainer'
        },{
            xtype: 'commentbar'
        }],
        plugins: [
        'pullrefresh', {
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: lang.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.comments.CommentCommentTpl')
    }
});