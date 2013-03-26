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
            },
            cardContainer: 'main #cardcontainer',
            courseNavigationView: 'coursenavigationview',
            courseContainer: 'coursenavigationview coursewall coursecontainer',
            commentField: 'commentspanel commentslist commentbar #commentfield',
            commentFieldUser: 'userwall commentbar #commentfield',
            commentFieldObject: 'list commentbar #commentfield',
            userContainer: 'usercontainer',
            menu: 'navigationmenu',
            publicationNavigationView: 'publicationsnavigationview',
            discussionContainer:'discussioncontainer'
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
            },
            'container titlebar #cancelar': { //cancelar par todos los forms
                tap: 'onCancelForm'
            },
            'commentform titlebar #submit': {
                tap: 'onAddComment'
            },
            'deliveryform titlebar #submit': {
                tap: 'onAddDelivery'
            },
            'discussionform titlebar #submit': {
                tap: 'onAddDiscussion'
            },
            'commentspanel commentslist commentbar #submit': {
                tap: 'onAddCommentComment'
            },
            // 'userwall commentbar #submit': {
            //     tap: 'onCommentOnUser'
            // },
            'commentbar #submit': {
                tap: 'onComment'
            },
            'userwall': {
                itemtap: 'onCommentTap'
            }
        }
    },
    onUserLogin: function (argument) {
        var me = this;
        me.loadMainView();
    },
    /**
     * cuando la aplicación inicia
     */
    launch: function () {
        var object, userName, me = this;
        if (localStorage.getItem("Token")) {
            me.loadMainView();
        }
    },
    /**
     * loads the mains user view
     */
    loadMainView: function () {
        var me = this;
        me.getMain().animateActiveItem(1, {
            type: 'slide',
            direction: 'left'
        });
        me.getMenu().setData(me.getData());

        //activamos las publicaciones
        me.getCardContainer().animateActiveItem(1, {
            type: 'slide',
            direction: 'left'
        });
        Ext.getStore('Publications').load();
    },
    /**
     * 
     */
    getData: function () {
        var object, userName;

        object = Ext.decode(localStorage.getItem("User"));
        userName = object.first_name + ' ' + object.last_name;
        return [{
            name: userName,
            group: 'PERFIL'
        }, {
            name: 'Últimas noticias',
            group: 'MURO'
        }, {
            name: 'Cursos',
            group: 'CURSOS'
        }, {
            name: 'Salir',
            group: 'AVANZADO'
        }];
    },
    /**
     * se ejecuta cuando el usuario selecciona alguna opción del menu
     */
    onMenuTap: function (list, index, target, record, e, eOpts) {
        var me = this;
        switch (index) {
            case 0:
                me.getCardContainer().animateActiveItem(0, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Comments').load();
                var object = Ext.decode(localStorage.getItem("User")),
                    data = {
                        wall: object.coverphoto.url,
                        avatar: object.avatar.url,
                        bios: object.bios,
                        name: object.first_name + ' ' + object.last_name
                    };
                me.getUserContainer().up('list').commentType = 'User';
                me.getUserContainer().up('list').comentableId = object.id;
                me.getUserContainer().setData(data);
                break;
            case 1:
                me.getCardContainer().animateActiveItem(1, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Publications').load();
                break;
            case 2:
                me.getCardContainer().animateActiveItem(2, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Courses').load();
                break;
            case 3:
                localStorage.removeItem('User');
                localStorage.removeItem('Token');
                localStorage.removeItem('UserId');
                me.getMain().animateActiveItem(0, {
                    type: 'slide',
                    direction: 'right'
                });
                me.getMenu().getStore().removeAll();
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
            return;
        }
        if (e.getTarget('div.comment')) {
            Ext.getStore('Comments').load({
                params: {
                    publicacionId: record.get('id')
                },
                scope: this
            });
            Ext.create('Cursame.view.comments.CommentsPanel', {
                objectData: record.getData()
            }).show();
            return;
        }
        this.pushPublicationContainer(record);
    },
    /**
     * 
     */
    pushPublicationContainer: function (record) {
        var me = this,course,user,publication;
        publication = record.get('publication');
        course = record.get('course');
        user = record.get('user');

        if(course){
             publication.wall = course.avatar.modern.url;
        }
        else{
             publication.wall = user.coverphoto.expanded;
        }
        publication.avatar = user.avatar.modern.url;

        switch (record.get('publication_type')) {
            case 'discussion':
                me.getPublicationNavigationView().push({
                    xtype: 'discussionwall',
                    commentType:'Discussion',
                    comentableId:publication.id

                });
                me.getDiscussionContainer().setData(publication);
                Ext.getStore('Comments').load({
                    params: {
                        publicacionId: record.get('id')
                    },
                    scope: this
                });
                break;
            case 'delivery':
                break;
            case 'comment':
                break;
            case 'course':
                break;
            case 'survey':
                break;
        }
    },
    /**
     * onCommentTap
     */
    onCommentTap: function (dataview, index, target, record, e, opt) {
        var cComments = Ext.getStore('CommentsComments');
        if (e.getTarget('div.like')) {
            alert('me gusta!');
        }
        if (e.getTarget('div.comment')) {
            var commentsPanel = Ext.create('Cursame.view.comments.CommentsPanel', {
                objectData: record.getData()
            });

            commentsPanel.down('commentslist').setStore(cComments);

            cComments.load({
                params: {
                    comment: record.get('id')
                },
                scope: this
            });

            cComments.on('beforeload', function (store, operation, eOpts) {
                store.getProxy().setExtraParams({
                    auth_token: localStorage.getItem("Token"),
                    comment: record.get('id')
                });
            });

            commentsPanel.show();
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
                                    me.onCourseDetails(c, record);
                                }
                                if (e.getTarget('div.create-comment')) {
                                    me.onCourseCreateComment(c, record);
                                }
                                if (e.getTarget('div.create-homework')) {
                                    me.onCourseCreateHomework(c, record);
                                }
                                if (e.getTarget('div.create-discussion')) {
                                    me.onCourseCreateDiscussion(c, record);
                                }
                            });
                            c.addedListener = true;
                        }
                    }
                }
            });
            me.getCourseContainer().setRecord(record);
            Ext.getStore('Publications').load({
                params: {
                    publicacionId: record.get('id'),
                    type: 'Course'
                },
                scope: this
            });
        });
    },
    /**
     * 
     */
    onCourseCreateComment: function (c, record) {
        Ext.create('Cursame.view.comments.CommentForm', {
            objectId: record.get('id')
        }).show();
    },
    /**
     * 
     */
    onCourseCreateHomework: function (c, record) {
        Ext.create('Cursame.view.deliveries.DeliveryForm', {
            objectId: record.get('id')
        }).show();
    },
    /**
     * 
     */
    onCourseCreateDiscussion: function (c, record) {
        Ext.create('Cursame.view.discussions.DiscussionForm', {
            objectId: record.get('id')
        }).show();
    },
    /**
     * 
     */
    onCourseDetails: function (c, record) {
        Ext.create('Cursame.view.courses.CourseDetailsPanel', {
            data: record.getData()
        }).show();
    },
    /**
     * 
     */
    onCancelForm: function (btn) {
        var form = btn.up('formpanel');
        form.reset();
        form.hide();
    },
    /**
     * 
     */
    onAddComment: function (btn) {
        var form = btn.up('formpanel'),
            comment = form.down('textareafield').getValue(),
            me = this;
        me.saveComment(comment, 'Course', form.objectId, form);
    },
    /**
     * 
     */
    onAddCommentComment: function (btn) {
        var comment = this.getCommentField().getValue(),
            form = btn.up('commentspanel'),
            data = form.objectData,
            me = this;
        if (comment) {
            me.saveComment(comment, Core.toFirstUpperCase(data.publication_type || 'comment'), data.publication_id || data.id, form);
        }
    },
    /**
     * Metodo generico  para agregar comentarios a discussiones, usuario, surveys ..
     * @param  {object} btn boton que dispara la acción
     * @return {comment}     comentario guardado
     */
    onComment:function  (btn) {
      var list = btn.up('list'),
        comment = list.down('textfield').getValue();
      if (comment) {
        this.saveComment(comment, list.commentType, list.comentableId, null);
      }
    },
    saveComment: function (comment, commentableType, commentableId, form) {
        var me = this;

        me.getMain().setMasked({
            xtype: 'loadmask',
            message: lang.saving
        });
        Core.ajax({
            url: 'api/create_comment',
            params: {
                comment: comment,
                commentable_type: commentableType,
                commentable_id: commentableId
            },
            success: function (response) {
                me.getMain().setMasked(false);
                if (form) {
                    form.hide();
                    form.destroy();
                }
                Ext.getStore('Comments').load();
            }
        });
    },
    /**
     * 
     */
    onAddDelivery: function (btn) {
        var form = btn.up('formpanel'),
            values = form.getValues(),
            me = this;
        values.courseId = form.objectId;

        form.setMasked({
            xtype: 'loadmask',
            message: lang.saving
        });

        Core.ajax({
            url: 'api/create_delivery',
            params: values,
            success: function (response) {
                form.setMasked(false);
                me.onCancelForm(btn);
            }
        });
    },
    /**
     * 
     */
    onAddDiscussion: function (btn) {
        var form = btn.up('formpanel'),
            values = form.getValues(),
            me = this;
        values.courseId = form.objectId;

        form.setMasked({
            xtype: 'loadmask',
            message: lang.saving
        });

        Core.ajax({
            url: 'api/create_discussion',
            params: values,
            success: function (response) {
                form.setMasked(false);
                me.onCancelForm(btn);
            }
        });
    }
});