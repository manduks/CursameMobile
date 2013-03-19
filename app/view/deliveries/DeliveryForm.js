/**
 * @class Cursame.view.deliveries.DeliveryForm
 * @extends Ext.form.Panel
 * This is the delivery form panel
 */
Ext.define('Cursame.view.deliveries.DeliveryForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.deliveryform',

    config: {
        padding: 10,
        modal: true,
        centered: true,
        hideOnMaskTap: true,
        width: 400,
        height: 350,
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
            },{
                xtype: 'textfield',
                name: 'title',
                placeHolder:'Titulo'
            },{
                xtype: 'textareafield',
                name: 'description',
                placeHolder:'Descripción'
            },{
                xtype: 'datepickerfield',
                destroyPickerOnHide:true,
                name: 'publication',
                placeHolder:'Día de publicación',
                value: new Date(),
                picker:{
					yearFrom: 2013,
					yearTo: 2030
                }
            },{
                xtype: 'datepickerfield',
                destroyPickerOnHide:true,
                name: 'deliver',
                placeHolder:'Día de entrega',
                value: new Date(),
                picker:{
					yearFrom: 2013,
					yearTo: 2030
                }
            },{
				xtype: 'numberfield',
				minValue: 0,
				maxValue: 100,
				name: 'value',
				placeHolder:'Valor'
            }]
    }
});