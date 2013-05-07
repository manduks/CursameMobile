/**
 * @class Cursame.view.deliveries.DeliverDeliveryForm
 * @extends Ext.form.Panel
 * Este es el form para enregar tarea
 */
Ext.define('Cursame.view.deliveries.DeliverDeliveryForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.deliverdeliveryForm',

    config: {
        objectId:undefined,
        padding: 10,
        modal: true,
        centered: true,
        hideOnMaskTap: true,
        width: 400,
        height: 220,
        showAnimation: Ext.os.is.Android ? false : {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },
        hideAnimation: Ext.os.is.Android ? false : {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        },
        items: [{
                xtype: 'titlebar',
                docked: 'top',
                title: 'Tarea',
                items: [{
                        align: 'left',
                        text:'Cancelar',
                        ui:'decline',
                        itemId:'cancelar'
                    },{
                        align: 'right',
                        text:'Entregar',
                        ui:'accept',
                        scope:this,
                        handler:function (btn) {
                            console.log(this.data);
                        }
                    }
                ]
            }, {
                xtype: 'textareafield',
                name: 'brief_description',
                maxRows: 6,
                placeHolder: 'entregar ...'
            }
        ]
    }
});

/**  Parameters: {"utf8"=>"✓", 
"authenticity_token"=>"GFUydf1t0zZ0vl3/YA0d7auGPnj/ybemp6KSDbvHVFE=",
    "assignment"=>{
    "course_id"=>"42",
    "delivery_id"=>"45", 
    "title"=>"Mi tarea", 
    "brief_description"=>"asdasdasdasdasdasdasdasd\r\nasd\r\nas\r\nd\r\nasd\r\nas\r\nd", "user_id"=>"4"},
    "commit"=>"Crear Assignment"
}*/