/**
 * @class Cursame.view.users.UserWall
 * @extends Ext.List
 * Este es el wall de los usuario
 * @manduks
 */
Ext.define('Cursame.view.users.UserWall', {
    extend: 'Ext.List',
    xtype: 'userwall',

    requires: ['Cursame.view.comments.CommentTpl', 'Cursame.view.comments.CommentBar','Cursame.view.users.UserContainer'],

    config: {
        commentableType:undefined,
        commentableId:undefined,
        store: 'Comments',
        pressedCls:'pressedCls',
        selectedCls :'pressedCls',
        masked: {
            xtype: 'loadmask',
            message: Core.Lang.es.loading
        },
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