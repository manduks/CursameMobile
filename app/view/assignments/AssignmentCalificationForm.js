/**
 * @class Cursame.view.deliveries.DeliverDeliveryForm
 * @extends Ext.form.Panel
 * Este es el form para enregar tarea
 */
Ext.define('Cursame.view.assignments.AssignmentCalificationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.assignmentcalificationform',

    config: {
        assignmentId:undefined,
        padding: 10,
        modal: true,
        centered: true,
        hideOnMaskTap: true,
        width: 400,
        height: 150,
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
            title: 'Calificación',
            items: [{
                align: 'left',
                text:'Cancelar',
                ui:'decline',
                itemId:'cancelar'
            },{
                align: 'right',
                text:'Calificar',
                ui:'accept',
                action: 'calificar',
                scope:this
            }
            ]
        }, {
            xtype: 'numberfield',
            name: 'rub_calification',
            placeHolder: 'calificar ...',
            itemId:'calificationField'
        }
        ]
    }
});