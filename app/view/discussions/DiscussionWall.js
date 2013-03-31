/**
 * @class Cursame.view.discussions.DiscussionWall
 * @extends Ext.List
 * Este es el wall de la discussion
 * @manduks
 */
Ext.define('Cursame.view.discussions.DiscussionWall', {
    extend: 'Ext.List',
    xtype: 'discussionwall',

    requires: ['Cursame.view.comments.CommentTpl', 'Cursame.view.comments.CommentBar','Cursame.view.discussions.DiscussionContainer'],

    config: {
        commentableType:undefined,
        commentableId:undefined,
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
            xtype:'discussioncontainer'
        },{
            xtype: 'commentbar'
        }],
        plugins: [{
            type: 'listpaging',
            autoPaging: true,
            loadMoreText: lang.loadMoreText
        }],
        itemTpl: Ext.create('Cursame.view.comments.CommentCommentTpl')
    }
});