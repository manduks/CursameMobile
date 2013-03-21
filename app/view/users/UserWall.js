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
            xtype:'usercontainer'
        },{
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