/**
 * @class Cursame.view.tablet.NavigationMenu
 * @extends Ext.List
 * This component show the wall of cursame app
 */
 Ext.define('Cursame.view.tablet.NavigationMenu', {
    extend: 'Ext.List',
    xtype: 'navigationmenu',
    config: {
        itemTpl: '<div class="contact"><strong>{name}</strong></div>',
        store: Ext.create('Ext.data.Store', {
         fields: ['name','group'],
         grouper: {
             groupFn: function(record) {
                 return record.get('group');
             },
             sortProperty: 'group',
             direction: "DESC"
         },

         data: [
             { name: 'Jose Armando Gonzalez',   group: 'PERFIL'},
             { name: 'Últimas noticias',     group: 'MURO'},
             // { name: 'Discusiones',     group: 'MURO'},
             { name: 'Cursos',      group: 'CURSOS'}
             // { name: 'Tareas',   group: 'CURSOS'},
             // { name: 'Discusiones',   group: 'CURSOS'},
             // { name: 'Cuestionarios',    group: 'CURSOS'},
             // { name: 'Tarea 1',   group: 'CALENDARIO'},
             // { name: 'Tarea 2',   group: 'CALENDARIO'}
         ]
     }),
        grouped: true
    }
});