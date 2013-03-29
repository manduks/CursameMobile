/**
 * @class Cursame.view.tablet.NavigationMenu
 * @extends Ext.List
 * This component show the wall of cursame app
 */
Ext.define('Cursame.view.tablet.NavigationMenu', {
    extend: 'Ext.List',
    xtype: 'navigationmenu',
    config: {
        itemTpl: new Ext.XTemplate(
            '<div class="menu">',
            '<img src="{icon}">',
            '<div class="fontmenu">{name}',
            '<tpl if="this.validateNotifications(numNotifications) == true ">',
            '<div class="avisoNot">{numNotifications}</div></div>',
            '</tpl>',
            '</div>', {
                validateNotifications: function (numNotifications) {
                    if (numNotifications !== undefined) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ),
        store: Ext.create('Ext.data.Store', {
            fields: ['name', 'group', 'icon', 'numNotifications'],
            grouper: {
                groupFn: function (record) {
                    return record.get('group');
                },
                sortProperty: 'group',
                direction: "DESC"
            }
        }),
        grouped: true
    }
});