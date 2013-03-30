/**
 * @class Cursame.view.comments.CommentsPanel
 * @extends Ext.Panel
 * Este es el panel que muestra los comentarios de las publicaciones
 * y también aquí se puede comentar
 */
Ext.define('Cursame.view.comments.CommentsPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.commentspanel',
    requires: ['Cursame.view.comments.CommentsList', 'Cursame.view.comments.CommentCommentTpl'],
    objectData:undefined,
    config: {
        dummy:undefined,
        padding: 10,
        modal: true,
        centered: true,
        hideOnMaskTap:true,
        layout: 'fit',
        width: 400,
        height: 400,
        showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        },
        items:[{
			xtype:'commentslist',
            itemTpl: Ext.create('Cursame.view.comments.CommentCommentTpl')
        }]
    }
});