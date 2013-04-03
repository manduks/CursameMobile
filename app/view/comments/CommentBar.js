/**
 * @class Cursame.view.comments.CommentBar
 * @extends Ext.Toolbar
 * Este es el componente para comentar
 */
Ext.define('Cursame.view.comments.CommentBar', {
    extend: 'Ext.Toolbar',
    xtype: 'commentbar',

    config: {
        docked: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            placeHolder: Core.Lang.es.sendComment,
            itemId:'commentfield',
            flex: 5
        }, {
            xtype: 'button',
            text: Core.Lang.es.send,
            //disabled: true,
            ui: 'accept',
            itemId:'submit',
            margin: 5,
            flex: 1,
            handler:function(btn){
                var bar = btn.up('commentbar');
                bar.down('textfield').setValue('');
            }
        }]
    }
});