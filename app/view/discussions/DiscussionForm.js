/**
 * @class Cursame.view.discussions.DiscussionForm
 * @extends Ext.form.Panel
 * Este es el form para las discusiones
 */
Ext.define('Cursame.view.discussions.DiscussionForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.discussionform',

    config: {
		padding: 10,
        modal: true,
        centered: true,
        hideOnMaskTap:true,
        width: 400,
        height: 280,
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
                title: 'Discusión',
                items: [{
                        align: 'left',
                        text:'cancelar',
                        itemId:'cancelar'
                    },{
                        align: 'right',
                        text:'publicar',
                        itemId:'submit'
                    }
                ]
            },{
                xtype: 'textfield',
                name: 'title',
                placeHolder:'Titulo'
            },{
                xtype: 'textareafield',
                name: 'discussion',
                maxRows: 7,
                placeHolder:'Discusión'
            }
        ]
    }
});