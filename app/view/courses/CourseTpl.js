/**
 * @class Cursame.view.courses.CourseTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the courses
 * @manduks
 */
Ext.define('Cursame.view.courses.CourseTpl', {
    extend: 'Ext.XTemplate',
    constructor: function () {
        var html;
        html = [
        '<div class="publication">',
            '<div class="content">',
                '<div class="tipe-line-course"></div>',
                '<div class="header">',
                    '<div class="avatar">',
                        '<img src="'+Cursame.URL+'/assets/course-avatarx-0a909a23b940f3f1701b2e6065c29fe6.png">',
                    '</div> ',
                    '<div class="info-user">',
                        '{title}',
                        '<br> <p class="time">Publico</p>',
                    '</div>',
                '</div>',
                '<div style="clear:both"></div>',
                '<div class="post">',
                    '<p>{silabus}</p>',
                '</div>',
                '<div style="clear:both"></div>',
            '</div>',
        '</div>'];
        this.callParent(html);
    }
});