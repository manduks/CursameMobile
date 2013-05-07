/**
 * @class Cursame.view.deliveries.DeliveryContainer
 * @extends Ext.Container
 * This is the Delivery container
 * @manduks
 */
Ext.define('Cursame.view.deliveries.DeliveryContainer', {
    extend: 'Ext.Container',
    xtype: 'deliverycontainer',
    requires: ['Cursame.view.deliveries.DeliveryTpl','Cursame.view.deliveries.DeliverDeliveryForm'],
    config: {
        docked: 'top',
        tpl: Ext.create('Cursame.view.deliveries.DeliveryTpl'),
        listeners: {
            resize: function (container) {
                container.on({
                    tap: function (e) {
                        var panel = Ext.create('Cursame.view.deliveries.DeliverDeliveryForm', {
                            // data: container.getData()
                        });
                        Ext.Viewport.add(panel);
                        panel.show('');
                    },
                    delegate: 'div.deliver'
                });
            }
        }
    }
});