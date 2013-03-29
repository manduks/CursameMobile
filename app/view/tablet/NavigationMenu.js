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
            '<tpl if="this.validateImage(icon) == true ">',
            '<img src="{icon}">',
            '<tpl else>',
            '<img src="'+Cursame.ASSETSURL+'resources/images/curso.jpg">',
            '</tpl>',
            '<div class="fontmenu">{name}',
            '<tpl if="this.validateNotifications(numNotifications) == true ">',
            '<div class="avisoNot">{numNotifications}</div></div>',
            '</tpl>',
            '</div>', {
                validateImage: function (icon) {
                    if (icon === null) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }, {
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