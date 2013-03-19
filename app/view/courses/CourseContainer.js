/**
 * @class Cursame.view.courses.CourseContainer
 * @extends Ext.List
 * This course container for the profile
 * @manduks
 */
Ext.define('Cursame.view.courses.CourseContainer', {
    extend: 'Ext.Container',
    xtype: 'coursecontainer',
    requires: ['Cursame.view.courses.CourseProfileTpl'],
    config: {
        docked: 'top',
        addedListener: false,
        tpl: Ext.create('Cursame.view.courses.CourseProfileTpl'),
        listeners: {
            painted: function (c) {
                if (!c.addedListener) {
                    c.on('tap', function (e,t) {
                    	if(e.getTarget('p')){
                    		c.fireEvent('coursedetails', c);
                    	}
                        if (e.getTarget('div.create-comment')) {
                            c.fireEvent('createcomment', c);
                        }
                        if (e.getTarget('div.create-homework')) {
                            c.fireEvent('createhomework', c);
                        }
                        if (e.getTarget('div.create-discussion')) {
                            c.fireEvent('creatediscussion', c);
                        }
                    });
                    c.addedListener=true;
                }
            }
        }
    }
});