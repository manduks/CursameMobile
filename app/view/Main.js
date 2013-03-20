/**
 * @class Cursame.view.Main
 * @extends Ext.Container
 * This is the main view of the cursame app
 * @manduks
 */
Ext.define('Cursame.view.Main', {
    extend: 'Ext.Container',
    xtype:'main',
    config: {
        layout: 'card',
        fullscreen: true,
        autoDestroy: false,
        activeItem:0
    }
});
