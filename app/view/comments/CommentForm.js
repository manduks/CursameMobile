/**
 * @class Cursame.view.comments.CommentForm
 * @extends Ext.form.Panel
 * Este es el form para comentar
 */
Ext.define('Cursame.view.comments.CommentForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.commentform',

    config: {
        padding: 10,
        modal: true,
        centered: true,
        hideOnMaskTap: true,
        width: 400,
        height: 220,
        title: 'Comentar',
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
        items: [{
                xtype: 'titlebar',
                docked: 'top',
                title: 'Comentar',
                items: [{
                        align: 'left',
                        text:'cancelar'
                    },{
                        align: 'right',
                        text:'publicar'
                    }
                ]
            }, {
                xtype: 'textareafield',
                name: 'comment',
                maxRows: 6,
                placeHolder: 'Comentario'
            }
        ]
    }
});