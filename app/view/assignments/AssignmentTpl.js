/**
 * @class Cursame.view.comments.AssignmentTpl
 * @extends Ext.XTemplate
 * This is the xtemplate for the assignments
 */
Ext.define('Cursame.view.assignments.AssignmentTpl', {
    extend: 'Ext.XTemplate',
    constructor: function () {
        var html;
        html = [
            '<div class="publication">',
                '<div class="content">',
                    '<div class="tipe-line-delivery"></div>',
                    '<div class="header">',
                        '<div class="avatar">',
                        '<tpl if="this.validateAvatar(values) == true">',
                            '<img src="'+Cursame.URL+'{user.avatar.url}">',
                        '<tpl else>',
                            '<img src="'+Cursame.URL+'/assets/imagex-c0ba274a8613da88126e84b2cd3b80b3.png">',
                        '</tpl>',
                        '</div> ',
                        '<div class="info-user">',
                            '{user_name}',
                            '<br> <p class="time">{created}</p>',
                        '</div>',
                    '</div>',
                    '<div class="calification"><h1>Calificación: {calification}</h1></div>',
                    '<div style="clear:both"></div>',
                    '<div class="post">',
                        '<p>{description}</p>',
                    '</div>',
                    '<div style="clear:both"></div>',
                '</div>',
            '</div>', {
                validateAvatar: function (values) {
                    if (values.user && values.user.avatar && values.user.avatar.url !== null) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }];
        this.callParent(html);
    }
});