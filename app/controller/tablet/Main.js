/**
 * @class Cursame.controller.tablet.Main
 * @extends Cursame.controller.Main
 * Main controller of the tablet version
 */
Ext.define('Cursame.controller.tablet.Main', {
    extend: 'Cursame.controller.Main',

    config: {
        activeNavigationView: undefined, //Referencia al Navigation View Activo
        refs: {
            main: {
                selector: 'main'
            },
            publicationsList: 'publicationslist',
            cardContainer: 'main #cardcontainer',
            courseNavigationView: 'coursenavigationview',
            commentField: 'commentspanel commentslist commentbar #commentfield',
            commentFieldUser: 'userwall commentbar #commentfield',
            commentFieldObject: 'list commentbar #commentfield',
            userContainer: 'usercontainer',
            menu: 'navigationmenu',
            publicationNavigationView: 'publicationsnavigationview',
            discussionContainer: 'discussioncontainer',
            deliveryContainer: 'deliverycontainer',
            commentContainer: 'commentcontainer',
            courseContainer: 'coursecontainer',
            notificationNavigationView: 'notificationnavigationview'
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
            'notificationslist':{
                itemtap:'onNotificationTap'
            },
            'container titlebar #cancelar': { //cancelar par todos los forms
                tap: 'onCancelForm'
            },
            'deliveryform titlebar #submit': {
                tap: 'onAddDelivery'
            },
            'discussionform titlebar #submit': {
                tap: 'onAddDiscussion'
            },
            'commentbar #submit': {
                tap: 'onComment'
            },
            'commentform titlebar #submit': {
                tap: 'onAddComment'
            },
            'commentspanel commentslist commentbar #submit': {
                tap: 'onAddCommentComment'
            },
            'userwall': {
                itemtap: 'onCommentTap'
            },
            'coursewall': {
                itemtap: 'onPublicationTap'
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
            name: 'Notificaciones',
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
        if(me.getActiveNavigationView()){//Si ya hay un navigation view lo reseteamos
            me.getActiveNavigationView().reset();
        }
        switch (index) {
            case 0:
                 var user = Ext.decode(localStorage.getItem("User")),
                    data = {
                        wall: user.coverphoto.url,
                        avatar: user.avatar.url,
                        bios: user.bios,
                        name: user.first_name + ' ' + user.last_name
                    };
                me.getCardContainer().animateActiveItem(0, {
                    type: 'slide',
                    direction: 'left'
                });
                me.getUserContainer().up('list').commentType = 'User';
                me.getUserContainer().up('list').comentableId = user.id;
                me.loadCommentsByType('User',user.id);
                me.getUserContainer().setData(data);
                break;
            case 1:
                me.getCardContainer().animateActiveItem(1, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Publications').load();
                me.setActiveNavigationView(me.getPublicationNavigationView());
                break;
            case 2:
                me.getCardContainer().animateActiveItem(2, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Notifications').load();
                me.setActiveNavigationView(me.getNotificationNavigationView());
                break;
            case 3:
                me.getCardContainer().animateActiveItem(3, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Courses').load();
                me.setActiveNavigationView(me.getCourseNavigationView());
                break;
            case 4:
                localStorage.removeItem('User');
                localStorage.removeItem('Token');
                localStorage.removeItem('UserId');
                me.getMain().animateActiveItem(0, {
                    type: 'slide',
                    direction: 'right'
                });
                me.getMenu().getStore().removeAll();
                break;
            case 5:
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
        console.info(record);
        if (e.getTarget('div.comment')) {
            Ext.getStore('Comments').load({
                params: {
                    commentable_type: record.data.publication_type,
                    commentable_id: record.data.publication_id
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
        var me = this,
            course, user, publication, publicationId;
        publication = record.get('publication');
        publicationId = record.get('id');
        course = record.get('course');
        user = record.get('user');
        if (course) {
            publication.wall = course.coverphoto.url;
            publication.coverphoto = course.coverphoto.url;
            publication.avatar = course.avatar.url;
            publication.courseName = 'Programación'; //@todo poner bien el titulo ...
        } else {
            publication.wall = user.coverphoto.url;
            publication.coverphoto = user.coverphoto.url;
            publication.avatar = user.avatar.url;
        }
        publication.user_name = user.first_name +' '+ user.last_name;
        publication.timeAgo = Core.timeAgo(publication.created_at);

        switch (record.get('publication_type')) {
            case 'discussion':
                me.getActiveNavigationView().push({
                    xtype: 'discussionwall',
                    commentType: 'Discussion',
                    comentableId: publication.id,
                    publicacionId: publicationId
                });
                me.getDiscussionContainer().setData(publication);
                me.loadCommentsByType('Discussion',publication.id);
                break;
            case 'delivery':
                me.getActiveNavigationView().push({
                    xtype: 'deliverywall',
                    commentType: 'Delivery',
                    comentableId: publication.id,
                    publicacionId: publicationId
                });
                me.getDeliveryContainer().setData(publication);
                me.loadCommentsByType('Delivery',publication.id);
                break;
            case 'comment':
                me.getActiveNavigationView().push({
                    xtype: 'commentwall',
                    commentType: 'Comment',
                    comentableId: publication.id,
                    publicacionId: publicationId
                });
                me.getCommentContainer().setData(publication);
                me.loadCommentsByType('Comment',publication.id);
                break;
            case 'course':
                me.pushCourseToView(me.getActiveNavigationView(), publication);
                break;
            case 'survey':
                break;
        }
    },

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
     * se ejecuta cuando se da click sobre algún curso
     */
    onCourseTap: function (dataview, index, target, record, e, opt) {
        var me = this;
        me.pushCourseToView(me.getCourseNavigationView(), record.data);
    },
    /**
     * se ejecuta cuando se le da click a una notificación
     */
    onNotificationTap:function  (dataview, index, target, record, e, opt) {
        var me = this,creator,course,
            data = record.get('notificator'),
            navigationView = me.getNotificationNavigationView();
        switch(record.get('kind')){
            case 'user_comment_on_network':
                navigationView.push({
                    xtype: 'commentwall',
                    commentType: 'Comment',
                    comentableId: data.id
                });
                creator = record.get('creator');
                data.user_name = creator.first_name +' '+ creator.last_name;
                data.timeAgo = Core.timeAgo(data.created_at);
                data.avatar = creator.avatar.url;

                me.getCommentContainer().setData(data);
                me.loadCommentsByType('Comment',data.id);
            break;
            case 'user_comment_on_course':
            break;
            case 'new_delivery_on_course':
                navigationView.push({
                    xtype: 'deliverywall',
                    commentType: 'Delivery',
                    comentableId: data.id
                });

                course = record.get('creator');
                data.wall = course.coverphoto.url;
                data.avatar = course.avatar.url;

                me.getDeliveryContainer().setData(data);
                me.loadCommentsByType('Delivery',data.id);
            break;
            case 'new_public_course_on_network':
                data.avatar = data.avatar.url;
                data.coverphoto = data.coverphoto.url;
                me.pushCourseToView(me.getNotificationNavigationView(),record.get('notificator'));
            break;
            case 'new_survey_on_course':break;
        }
    },
    /**
     * 
     * @param  {string} commentable_type 
     * @param  {int} commentable_id 
     * @return 
     */
    loadCommentsByType: function (commentable_type,commentable_id) {
        Ext.getStore('Comments').load({
            params: {
                commentable_type: commentable_type,
                commentable_id: commentable_id
            },
            scope: this
        });
    },
    /**
     * push course
     */
    pushCourseToView: function (view, data) {
        var me = this;
        view.push({
            xtype: 'coursewall',
            title: data.id.title,
            listeners: { //esto no deberia ser asi
                painted: function (c) {
                    if (!c.addedListener) {
                        c.on('tap', function (e, t) {
                            if (e.getTarget('div.aboutme-course')) {
                                me.onCourseDetails(c, data);
                            }
                            if (e.getTarget('div.create-comment')) {
                                me.onCourseCreateComment(c, data);
                            }
                            if (e.getTarget('div.create-homework')) {
                                me.onCourseCreateHomework(c, data);
                            }
                            if (e.getTarget('div.create-discussion')) {
                                me.onCourseCreateDiscussion(c, data);
                            }
                        });
                        c.addedListener = true;
                    }
                }
            }
        });
        me.getCourseContainer().setData(data);
        // cargamos las publicaciones del curso
        Ext.getStore('Publications').load({
            params: {
                publicacionId: data.id,
                type: 'Course'
            },
            scope: me,
            callback: function (argument) {
            }
        });
    },
    /**
     *
     */
    onCourseCreateComment: function (c, data) {
        Ext.create('Cursame.view.comments.CommentForm', {
            objectId: data.id
        }).show(''); //Se le pasa el parametro cadena vacia para evitar bug
    },
    /**
     *
     */
    onCourseCreateHomework: function (c, data) {
        Ext.create('Cursame.view.deliveries.DeliveryForm', {
            objectId: data.id
        }).show('');
    },
    /**
     *
     */
    onCourseCreateDiscussion: function (c, data) {
        Ext.create('Cursame.view.discussions.DiscussionForm', {
            objectId: data.id
        }).show('');
    },
    /**
     *
     */
    onCourseDetails: function (c, data) {
        Ext.create('Cursame.view.courses.CourseDetailsPanel', {
            data: data
        }).show('');
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
            me = this,
            list = btn.up('list');
        me.saveComment(comment, 'Course', form.objectId, form, null);
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
            me.saveComment(comment, data.publication_type, data.publication_id, form);
        }
    },
    /**
     * Metodo generico  para agregar comentarios a discussiones, usuario, surveys ..
     * @param  {object} btn boton que dispara la acción
     * @return {comment}     comentario guardado
     */
    onComment: function (btn) {
        var me = this,
            list = btn.up('list'),
            comment = list.down('textfield').getValue();
        console.info(list);
        if (comment) {
            me.saveComment(comment, list.commentType, list.comentableId, null);
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
                Ext.getStore('Comments').load({
                    params: {
                        commentable_type: commentableType,
                        commentable_id: commentableId
                    },
                    scope: this
                });
            }
        });
    },
    /**
     *
     */
    onAddDelivery: function (btn) {
        this.addElement(btn, 'api/create_delivery');
    },
    /**
     *
     */
    onAddDiscussion: function (btn) {
        this.addElement(btn, 'api/create_discussion');
    },

    addElement:function(btn, url){
        var form = btn.up('formpanel'),
            values = form.getValues(),
            me = this;
        values.courseId = form.objectId;

        form.setMasked({
            xtype: 'loadmask',
            message: lang.saving
        });

        Core.ajax({
            url: url,
            params: values,
            success: function (response) {
                form.setMasked(false);
                me.onCancelForm(btn);
            }
        });

        Ext.getStore('Publications').load();
    }
});