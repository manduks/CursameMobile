/**
 * @class Cursame.controller.phone.Main
 * @extends Cursame.controller.Main
 * Main controller of the phone version
 */
Ext.define('Cursame.controller.phone.Main', {
    extend: 'Cursame.controller.Main',

    config: {
        refs: {
            main: {
                selector: 'main'
            },
            cardContainer: 'main #cardcontainer',
            courseNavigationView: 'coursenavigationview',
            courseContainer: 'coursenavigationview coursewall coursecontainer'
        },
        control: {
            'loginform': {
                logeado: 'onUserLogin'
            },
            'navigationmenu': {
                itemtap: 'onMenuTap'
            },
            'publicationslist': {
                itemtap: 'onPublicationTap'
            },
            'courseslist': {
                itemtap: 'onCourseTap'
            }
        }
    },
    onUserLogin: function (argument) {
        var me = this;
        me.getMain().animateActiveItem(1, {
            type: 'slide',
            direction: 'left'
        });
    },
    /**
     * se ejecuta cuando el usuario selecciona alguna opción del menu
     */
    onMenuTap: function (list, index, target, record, e, eOpts) {
        switch (index) {
            case 0:
                this.getCardContainer().animateActiveItem(0, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Comments').load();
                break;
            case 1:
                this.getCardContainer().animateActiveItem(1, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Publications').load();
                break;
            case 2:
                this.getCardContainer().animateActiveItem(2, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Courses').load();
                Ext.getStore('Publications').load();
                break;
            case 3:
                break;
            case 4:
                break;
        }
    },
    /**
     * se ejecuta cuando se da click sobre alguna publicacion
     */
    onPublicationTap: function (dataview, index, target, record, e, opt) {
        if (e.getTarget('div.like')) {
            alert('me gusta!');
        }
        if (e.getTarget('div.comment')) {
            Ext.getStore('Comments').load();
            Ext.create('Cursame.view.comments.CommentsPanel').show();
        }
    },
    /**
     * se ejecuta cuando se da click sobre alguna publicacion
     */
    onCourseTap: function (dataview, index, target, record, e, opt) {
        var me = this;
        Ext.getStore('Publications').load(function (argument) {
            me.getCourseNavigationView().push({
                xtype: 'coursewall',
                title: record.get('title'),
                listeners: { //esto no deberia ser asi
                    painted: function (c) {
                        if (!c.addedListener) {
                            c.on('tap', function (e, t) {
                                if (e.getTarget('div.aboutme-course')) {
                                    me.onCourseDetails(c,record);
                                }
                                if (e.getTarget('div.create-comment')) {
                                    me.onCourseCreateComment(c);
                                }
                                if (e.getTarget('div.create-homework')) {
                                    me.onCourseCreateHomework(c);
                                }
                                if (e.getTarget('div.create-discussion')) {
                                    me.onCourseCreateDiscussion(c);
                                }
                            });
                            c.addedListener = true;
                        }
                    }
                }
            });
            me.getCourseContainer().setRecord(record);
        });
    },
    /**
     * 
     */
    onCourseCreateComment: function (c) {
        Ext.create('Cursame.view.comments.CommentForm').show();
    },
    /**
     * 
     */
    onCourseCreateHomework: function (c) {
        Ext.create('Cursame.view.deliveries.DeliveryForm').show();
    },
    /**
     * 
     */
    onCourseCreateDiscussion: function (c) {
        Ext.create('Cursame.view.discussions.DiscussionForm').show();
    },
    /**
     * 
     */
    onCourseDetails: function (c,record) {
        console.log(record);
        Ext.create('Cursame.view.courses.CourseDetailsPanel',{
            data:record.getData()
        }).show();
    }
});