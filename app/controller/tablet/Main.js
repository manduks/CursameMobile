/**
 * @class Cursame.controller.tablet.Main
 * @extends Cursame.controller.Main
 * Main controller of the tablet version
 */
Ext.define('Cursame.controller.tablet.Main', {
    extend: 'Cursame.controller.Main',

    config: {
        refs: {
            main: {
                selector: 'main'
            }
        },
        control: {
            'loginform': {
                logeado: 'onUserLogin'
            }
        }
    },
    onUserLogin: function (argument) {
        var me = this;
        me.getMain().animateActiveItem(1, {
            type: 'slide',
            direction: 'left'
        });
    }
});