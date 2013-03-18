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
        ui: 'accept',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            placeHolder: lang.sendComment,
            flex: 5
        }, {
            xtype: 'button',
            text: lang.send,
            disabled: true,
            ui: 'accept',
            margin: 5,
            flex: 1
        }]
    }
});