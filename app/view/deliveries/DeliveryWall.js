/**
 * @class Cursame.view.deliveries.DeliveryWall
 * @extends Ext.List
 * Este es el wall de la tarea
 * @manduks
 */
Ext.define('Cursame.view.deliveries.DeliveryWall', {
    extend: 'Ext.List',
    xtype: 'deliverywall',

    requires: ['Cursame.view.comments.CommentTpl', 'Cursame.view.comments.CommentBar','Cursame.view.deliveries.DeliveryContainer'],

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
            xtype:'deliverycontainer'
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