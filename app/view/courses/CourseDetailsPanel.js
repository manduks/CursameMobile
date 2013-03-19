/**
 * @class Cursame.view.courses.CourseDetailsPanel
 * @extends Ext.form.Panel
 * Este es el panel para mostrar los detalles del curso
 */
Ext.define('Cursame.view.courses.CourseDetailsPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'coursedetailspanel',

    config: {
        padding: 10,
        modal: true,
        centered: true,
        hideOnMaskTap: true,
        width: 500,
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
        tpl: [
        '<div class="course-info">',
            '<b>Nombre:</b>',
            '<p>{title}</p>',
        '</div>',
        '<div class="course-info"> <b>Duraci&oacute;n:</b>',
            '<p>{init_date} - {finish_date}</p>',
        '</div> ',
        '<div class="course-info"> <b>Acerca de:</b>',
            '<p>{silabus}<p>',
        '</div>'
        ]
    }
});