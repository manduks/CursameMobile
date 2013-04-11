/**
 * @class Cursame.controller.tablet.Main
 * @extends Cursame.controller.Main
 * Main controller of the tablet version
 */
Ext.define('Cursame.controller.tablet.Main', {
    extend: 'Cursame.controller.Main',

    config: {
        activeNavigationView: undefined, //Referencia al Navigation View Activo
        currentStore: undefined,
        headerPublicationsData:undefined,//Referencia a los datos par mostrar el header
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
            menu: 'navigationmenu',
            publicationNavigationView: 'publicationsnavigationview',
            discussionContainer: 'discussioncontainer',
            deliveryContainer: 'deliverycontainer',
            commentContainer: 'commentcontainer',
            notificationNavigationView: 'notificationnavigationview',
            userNavigationView: 'usernavigationview',
            commentsPanel: 'commentspanel',
            userWall: 'userwall',
            courseWall: 'coursewall'
        },
        control: {
            'loginform': {
                logeado: 'onUserLogin'
            },
            'navigationmenu': {
                itemtap: 'onMenuTap',
                select: 'onMenuSelect'
            },
            'publicationslist': {
                itemtap: 'onPublicationTap'
            },
            'courseslist': {
                itemtap: 'onCourseTap'
            },
            'notificationslist': {
                itemtap: 'onNotificationTap'
            },
            'userslist': {
                itemtap: 'onUserTap'
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
                itemtap: 'onCommentUserTap'
            },
            'coursewall': {
                itemtap: 'onPublicationTap'
            },
            'commentslist': {
                itemtap: 'onCommentTap'
            },
            'commentwall': {
                itemtap: 'onCommentTap'
            },
            'deliverywall': {
                itemtap: 'onCommentTap'
            },
            'discussionwall': {
                itemtap: 'onCommentTap'
            },
            'button[action = menuButton]': {
                tap: 'onMenuButtonTap'
            },
            'main #cardcontainer': {
                dragend: 'onMainContainerDragEnd'
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
        //activamos publicaciones
        setTimeout(function () {
            me.onMenuTap(me.getMenu(), 1);
        }, 500);

        me.startPushNotifications();
    },
    /**
     * este metodo iniciliza las push notifications mediante faye 
     * @return {objet} soy un pinch pro!!
     */
    startPushNotifications:function(){
        var me = this, stores ={}, user, NotificationsChannel;

        user = Ext.decode(localStorage.getItem("User"));
        stores = {
            'user_comment_on_network':{
                'Publications':'Publications'
            },
            'user_comment_on_course':{
                'Publications':'Publications'
            },
            'new_delivery_on_course':{
                'Publications':'Publications'
            },
            'new_public_course_on_network':{
                'Publications':'Publications',
                'Courses':'Courses'
            },
            'new_survey_on_course':{
                'Publications':'Publications'
            },
            'user_comment_on_comment':{
                'CommentsComments':'CommentsComments',
                'Comments':'Comments'
            },
            'user_comment_on_user':{
                'Comments':'Comments'
            }
        };

        NotificationsChannel = Ext.decode(localStorage.getItem("NotificationsChannel"));
        PrivatePub.sign(NotificationsChannel);
        //metodo que escucha las notificaciones y las setea
        PrivatePub.subscribe(NotificationsChannel.channel, function(data, channel) {
            store = me.getMenu().getStore().getAt(2).set('numNotifications',data.num);
            user.notifications.length = data.num;
            localStorage.setItem("User", Ext.encode(user));
            Ext.getStore(stores[data.notification.kind][me.currentStore] || 'CommentsComments').load();
        });
    },
    /**
     *
     */
    getData: function (numNotifications) {
        var user, userName, avatar;

        user = Ext.decode(localStorage.getItem("User"));
        if (user.first_name || user.last_name != null){
            userName = user.first_name && user.last_name ? user.first_name + ' ' + user.last_name : 'Usuario';
        } else {
            userName = 'Usuario';
        }
        avatar = user.avatar.url ? Cursame.URL + user.avatar.url : Cursame.URL + '/assets/imagex-c0ba274a8613da88126e84b2cd3b80b3.png';
        return [
            {
                name: userName,
                icon: avatar,
                group: 'PERFIL'
            },
            {
                name: 'Inicio',
                icon: Cursame.ASSETSURL + 'resources/images/muro.png',
                group: 'MURO'
            },
            {
                name: 'Notificaciones',
                icon: Cursame.ASSETSURL + 'resources/images/notification.png',
                numNotifications: user.notifications.length,
                group: 'MURO'
            },
            {
                name: 'Cursos',
                icon: Cursame.ASSETSURL + 'resources/images/cursos.png',
                group: 'CURSOS'
            },
            {
                name: 'Comunidad',
                icon: Cursame.ASSETSURL + 'resources/images/comunidad.png',
                group: 'COMUNIDAD'
            },
            {
                name: 'Salir',
                icon: Cursame.ASSETSURL + 'resources/images/salir.png',
                group: 'AVANZADO'
            }
        ];

    },
    /**
     * se ejecuta cuando el usuario selecciona alguna opción del menu
     */
    onMenuTap: function (list, index, target, record, e, eOpts) {
        var me = this;
        if (me.getActiveNavigationView()) {//Si ya hay un navigation view lo reseteamos
            me.getActiveNavigationView().reset();
        }
        me.resetCurrentPageOnStores(); //Reseteamos todos los currentPage de los stores
        switch (index) {
            case 0:
                var user = Ext.decode(localStorage.getItem("User")),
                    data = {
                        headerWall: user.coverphoto.url,
                        headerAvatar: user.avatar.url,
                        headerBios: user.bios,
                        headerName: user
                    };
                me.getCardContainer().animateActiveItem(0, {
                    type: 'slide',
                    direction: 'left'
                });
                me.getUserWall().setCommentableType('User');
                me.getUserWall().setCommentableId(user.id);
                me.loadCommentsByType('User', user.id, me.addHeaderToComments.bind(me, [data]));
                break;
            case 1:
                me.getCardContainer().animateActiveItem(1, {
                    type: 'slide',
                    direction: 'left'
                });
                var record = Ext.getStore('Publications').getAt(0);
                if (record){
                   record.set('showHeader',null);
                   record.commit();
                }
                Ext.getStore('Publications').setParams({}, true);
                Ext.getStore('Publications').load();
                me.currentStore = 'Publications';
                me.setActiveNavigationView(me.getPublicationNavigationView());
                break;
            case 2:
                me.getCardContainer().animateActiveItem(2, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Notifications').setParams({});
                Ext.getStore('Notifications').load();
                me.currentStore = 'Notifications';
                me.setActiveNavigationView(me.getNotificationNavigationView());
                break;
            case 3:
                me.getCardContainer().animateActiveItem(3, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Courses').setParams({});
                Ext.getStore('Courses').load();
                me.currentStore = 'Courses';
                me.setActiveNavigationView(me.getCourseNavigationView());
                break;
            case 4:
                me.getCardContainer().animateActiveItem(4, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Users').setParams({});
                Ext.getStore('Users').load();
                me.currentStore = 'Users';
                me.setActiveNavigationView(me.getUserNavigationView());
                break;
            case 5:
                localStorage.removeItem('User');
                localStorage.removeItem('Token');
                localStorage.removeItem('UserId');
                me.getMain().animateActiveItem(0, {
                    type: 'slide',
                    direction: 'right'
                });
                me.getMenu().getStore().removeAll();
                break;
        }
    },

    /**
     * se ejecuta cuando se da click sobre alguna publicacion
     */
    onPublicationTap: function (dataview, index, target, record, e, opt) {
        var me = this,
            commentsStore = Ext.getStore('Comments'),
            publicationsStore = Ext.getStore('Publications');
        commentsStore.resetCurrentPage();//Se resetean los filtros de paginado para el store de Comentarios.
        if (e.getTarget('div.like')) {
            me.onLike(record, 'publication','Publications');
            return;
        }
        if (e.getTarget('div.comment')) {
            commentsStore.setParams({
                commentable_type: Core.Utils.toFirstUpperCase(record.data.publication_type),
                commentable_id: record.data.publication_id
            });
            commentsStore.load();
            me.currentStore = 'Comments';

            var panel = Ext.create('Cursame.view.comments.CommentsPanel', {
                objectData: record.getData(),
                listeners: {
                    hide: function (t) {
                        t.destroy();
                    }
                }
            });
            Ext.Viewport.add(panel);
            panel.show();
            return;
        }
        if (e.getTarget('div.aboutme-course')) {
            me.onCourseDetails(me, record.data);
            return;
        }
        if (e.getTarget('div.create-comment')) {
            me.onCourseCreateComment(me, record.data);
            return;
        }
        if (e.getTarget('div.create-homework')) {
            me.onCourseCreateHomework(me, record.data);
            return;
        }
        if (e.getTarget('div.create-discussion')) {
            me.onCourseCreateDiscussion(me, record.data);
            return;
        }
        me.pushPublicationContainer(record);
    },
    /**
     *
     */
    pushPublicationContainer: function (record) {
        var me = this,
            course, user, publication;
        publication = record.get('publication');
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
        publication.user_name = user.first_name + ' ' + user.last_name;
        publication.timeAgo = Core.Utils.timeAgo(publication.created_at);

        switch (record.get('publication_type')) {
            case 'discussion':
                me.getActiveNavigationView().push({
                    xtype: 'discussionwall',
                    title: Core.Lang.es.discussion,
                    commentableType: 'Discussion',
                    commentableId: publication.id
                });
                me.getDiscussionContainer().setData(publication);
                me.loadCommentsByType('Discussion', publication.id);
                break;
            case 'delivery':
                me.getActiveNavigationView().push({
                    xtype: 'deliverywall',
                    title: Core.Lang.es.delivery,
                    commentableType: 'Delivery',
                    commentableId: publication.id
                });
                publication.end_date = Core.Utils.timeAgo(publication.end_date);
                me.getDeliveryContainer().setData(publication);
                me.loadCommentsByType('Delivery', publication.id);
                break;
            case 'comment':
                me.getActiveNavigationView().push({
                    xtype: 'commentwall',
                    title: Core.Lang.es.comment,
                    commentableType: 'Comment',
                    commentableId: publication.id
                });
                me.getCommentContainer().setData(publication);
                me.loadCommentsByType('Comment', publication.id);
                break;
            case 'course':
                me.pushCourseToView(me.getActiveNavigationView(), publication);
                break;
            case 'survey':
                break;
        }
    },

    onCommentUserTap: function (dataview, index, target, record, e, opt) {
        var me = this,
            cComments = Ext.getStore('CommentsComments');
        Ext.getStore('CommentsComments').resetCurrentPage();//Se resetea el store de Comments Comments para inicializar la paginación
        if (e.getTarget('div.like')) {
            me.onLike(record, 'comment','Comments');
            return;
        }
        if (e.getTarget('div.comment')) {
            var commentsPanel = Ext.create('Cursame.view.comments.CommentsPanel', {
                objectData: record.getData(),
                listeners: {
                    hide: function (t) {
                        t.destroy();
                    }
                }
            });

            commentsPanel.down('commentslist').setStore(cComments);

            cComments.setParams({
                commentable_type: 'Comment',
                commentable_id: record.get('id')
            });
            cComments.load();
            me.currentStore = 'CommentsComments';

            Ext.Viewport.add(commentsPanel);
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
    onNotificationTap: function (dataview, index, target, record, e, opt) {
        var me = this, creator, course,
            data = record.get('notificator'),
            navigationView = me.getNotificationNavigationView();
        switch (record.get('kind')) {
            case 'user_comment_on_network':
                navigationView.push({
                    xtype: 'commentwall',
                    title: Core.Lang.es.comment,
                    commentableType: 'Comment',
                    commentableId: data.id
                });
                creator = record.get('creator');
                data.user_name = creator.first_name + ' ' + creator.last_name;
                data.timeAgo = Core.Utils.timeAgo(data.created_at);
                data.avatar = creator.avatar.url;

                me.getCommentContainer().setData(data);
                me.loadCommentsByType('Comment', data.id);
                break;
            case 'user_comment_on_course':
                navigationView.push({
                    xtype: 'commentwall',
                    title: Core.Lang.es.comment,
                    commentableType: 'Comment',
                    commentableId: data.id
                });
                creator = record.get('creator');
                data.user_name = creator.first_name + ' ' + creator.last_name;
                data.timeAgo = Core.Utils.timeAgo(data.created_at);
                data.avatar = creator.avatar.url;

                me.getCommentContainer().setData(data);
                me.loadCommentsByType('Comment', data.id);
                break;
            case 'new_delivery_on_course':
                navigationView.push({
                    xtype: 'deliverywall',
                    title: Core.Lang.es.delivery,
                    commentableType: 'Delivery',
                    commentableId: data.id
                });

                course = record.get('creator');
                data.wall = course.coverphoto.url;
                data.avatar = course.avatar.url;

                me.getDeliveryContainer().setData(data);
                me.loadCommentsByType('Delivery', data.id);
                break;
            case 'new_public_course_on_network':
                data.avatar = data.avatar.url;
                data.coverphoto = data.coverphoto.url;
                me.pushCourseToView(me.getNotificationNavigationView(), record.get('notificator'));
                break;
            case 'new_survey_on_course':
                break;
        }
    },
    /**
     *
     * @param  {string} commentableType
     * @param  {int} commentableId
     * @return
     */
    loadCommentsByType: function (commentableType, commentableId, callback) {
        var me = this,
            commentsStore = Ext.getStore('Comments');

        commentsStore.setParams({
            commentable_type: commentableType,
            commentable_id: commentableId
        });
        commentsStore.load(callback);
        me.currentStore = 'Comments';
    },
    /**
     * push course
     */
    pushCourseToView: function (view, data) {
        var me = this,
            publicationsStore = Ext.getStore('Publications');
        me.currentStore = 'Publications';
        view.push({
            xtype: 'coursewall',
            title: data.id.title
        });
        //me.getCourseContainer().setData(data);
        publicationsStore.setParams({
            publicacionId: data.id,
            type: 'Course'
        });
        me.setHeaderPublicationsData(data);//Guardamos los datos en la propiedad
        // cargamos las publicaciones del curso
        publicationsStore.load(me.addHeaderToPublications.bind(me));
    },

    onUserTap: function (dataview, index, target, record, e, opt) {
        var user = record.getData(), data, me = this;
        data = {
            headerWall: user.coverphoto,
            headerAvatar: user.avatar,
            headerBios: user.bios,
            headerName: user
        };
        me.getUserNavigationView().push({
            xtype: 'userwall',
            title: data.name
        });
        me.getUserNavigationView().down('userwall').setCommentableType('User');
        me.getUserNavigationView().down('userwall').setCommentableId(user.id);

        Ext.getStore('Comments').resetCurrentPage();
        me.loadCommentsByType('User', user.id, me.addHeaderToComments.bind(me, [data]));
    },
    /**
     *
     */
    onCourseCreateComment: function (c, data) {
        var panel = Ext.create('Cursame.view.comments.CommentForm', {
            objectId: data.headerId
        });
        Ext.Viewport.add(panel);
        panel.show('');
    },
    /**
     *
     */
    onCourseCreateHomework: function (c, data) {
        var panel = Ext.create('Cursame.view.deliveries.DeliveryForm', {
            objectId: data.headerId
        });
        Ext.Viewport.add(panel);
        panel.show('');
    },
    /**
     *
     */
    onCourseCreateDiscussion: function (c, data) {
        var panel = Ext.create('Cursame.view.discussions.DiscussionForm', {
            objectId: data.headerId
        });
        Ext.Viewport.add(panel);
        panel.show('');
    },
    /**
     *
     */
    onCourseDetails: function (c, data) {
        var panel = Ext.create('Cursame.view.courses.CourseDetailsPanel', {
            data: data
        });
        Ext.Viewport.add(panel);
        panel.show('');
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

        me.saveComment(comment, 'Course', form.getObjectId(), Ext.getStore('Publications'), form);
    },
    /**
     *
     */
    onAddCommentComment: function (btn) {
        var comment = this.getCommentField().getValue(),
            form = btn.up('commentspanel'),
            data = form.getObjectData(),
            me = this,
            type, id, store, record;

            if (data.publication_type && data.publication_id) {
                type = data.publication_type;
                id = data.publication_id;
                store = Ext.getStore('Comments');
                record = me.getPublicationsList().getSelection()[0];//Si se accede desde el Wall de Publicaciones.
                if (!record){
                    record = me.getCourseWall().getSelection()[0];//Si se accede desde un comentario de Cursos.
                }
            } else {
                type = 'Comment';
                id = data.id;
                store = Ext.getStore('CommentsComments');
                record = me.getUserWall().getSelection()[0];//Si se accede desde el Wall de Usuario.
                if (!record){
                    record = me.getUserNavigationView().down('userwall').getSelection()[0];//Si se accede desde un usuario de la comunidad
                }
            }

            me.saveComment(comment, Core.Utils.toFirstUpperCase(type), id, store, null, record);
    },
    /**
     * Metodo generico  para agregar comentarios a discussiones, usuario, surveys ..
     * @param  {object} btn boton que dispara la acción
     * @return {comment}     comentario guardado
     */
    onComment: function (btn) {
        var me = this, record,
            list = btn.up('list'),
            comment = list.down('textfield').getValue();

        if (list.getCommentableType && list.getCommentableId
            && list.getCommentableType() && list.getCommentableId()) {
            //record = me.getCourseWall().getSelection()[0];//Si se accede desde un comentario de Cursos.
            me.saveComment(comment, list.getCommentableType(), list.getCommentableId(), Ext.getStore('Comments'), null);
        }
    },
    saveComment: function (comment, commentableType, commentableId, store, form, record) {
        var me = this, num_comments;
        //Se valida si el formulario para agregar comentarios no esta vacio.
        if (comment != '') {
            me.getMain().setMasked({
                xtype: 'loadmask',
                message: Core.Lang.es.saving
            });
            Core.Utils.ajax({
                url: 'api/create_comment',
                params: {
                    comment: comment,
                    commentable_type: commentableType,
                    commentable_id: commentableId
                },
                success: function (response) {
                    var callback = {};
                    me.getMain().setMasked(false);
                    store.resetCurrentPage();
                    if (form) {
                        form.hide();
                        form.destroy();

                        store.setParams({
                            type: commentableType,
                            publicacionId: commentableId
                        });
                        callback = me.addHeaderToPublications.bind(me);
                    } else {
                        if (record) {
                            num_comments = record.get('num_comments') + 1;//Cuando se guarda un comentario se le suma al numero de comentarios.
                            record.set('num_comments', num_comments);
                            record.commit();
                        }

                        store.setParams({
                            commentable_type: commentableType,
                            commentable_id: commentableId
                        });
                    }
                    store.load(callback);
                    me.currentStore = store.getStoreId();
                }
            });
        } else {
            Ext.Msg.alert('', 'Escribe un Comentario');
        }

    },
    /**
     * Este metodo guarda los likes
     * @param  {String} type  tipo de elemento qeu obtiene el like
     * @param  {int} id    identificador del evento
     * @param  {object} store el store a recargar para ver los likes
     * @return {object}       el store del like
     */
    saveLike: function (type, id, record, store) {
        var me = this, store = Ext.getStore(store);
        me.getMain().setMasked({
            xtype: 'loadmask',
            message: Core.Lang.es.saving
        });
        Core.Utils.ajax({
            url: 'api/create_like',
            params: {
                type: type,
                id: id
            },
            success: function (response) {
                me.getMain().setMasked(false);
                store.resetCurrentPage();
                if (store.getStoreId() != 'Publications') {
                    store.setParams({
                        commentable_type: record.get('commentable_type'),
                        commentable_id: record.get('commentable_id')
                    });
                }
                store.load();
                me.currentStore = store.getStoreId();
            }
        });
    },
    /**
     *
     */
    onAddDelivery: function (btn) {
        this.addElement(btn, 'api/create_delivery', 'delivery');
    },
    /**
     *
     */
    onAddDiscussion: function (btn) {
        this.addElement(btn, 'api/create_discussion', 'discussion');
    },

    addElement: function (btn, url, publicationType) {
        var form = btn.up('formpanel'),
            values = form.getValues(),
            me = this,
            publication = values.publication,
            deliver = values.deliver;

        values.courseId = form.getObjectId();
        //Validación para el formulario de Creación de Publicaciones.
        if (values) {
            switch (publicationType) {
                case 'delivery':
                    if (values.title == '') {
                        return Ext.Msg.alert('', 'Escribe un titulo a la Tarea.');
                    }
                    else if (values.description == '') {
                        return Ext.Msg.alert('', 'Escribe una descripción a la Tarea.');
                    }
                    else if (deliver <= publication) {
                        return Ext.Msg.alert('', 'La fecha de Publicación no puede ser menor o igual a la fecha de Entrega');
                    }
                    else if (values.value == null) {
                        return Ext.Msg.alert('', 'Escribe un valor para la Tarea.');
                    }
                    break;
                case 'discussion':
                    if (values.title == '') {
                        return Ext.Msg.alert('', 'Escribe un titulo a la Discusión.');
                    }
                    else if (values.discussion == '') {
                        return Ext.Msg.alert('', 'Escribe una descripción en la Discusión');
                    }
                    break;
            }
        }

        form.setMasked({
            xtype: 'loadmask',
            message: Core.Lang.es.saving
        });

        Core.Utils.ajax({
            url: url,
            params: values,
            success: function (response) {
                form.setMasked(false);
                me.onCancelForm(btn);
            }
        });
        Ext.getStore('Publications').setParams({});
        Ext.getStore('Publications').load(me.addHeaderToPublications.bind(me));
        me.currentStore = 'Publications';
    },

    resetCurrentPageOnStores: function () {
        Ext.getStore('Comments').resetCurrentPage();//Se resetean los filtros de paginado para el store de Comentarios.
        Ext.getStore('Publications').resetCurrentPage();//Se resetean los filtros de paginado para el store de Publicaciones.
        Ext.getStore('Notifications').resetCurrentPage();//Se resetean los filtros de paginado para el store de Notificaciones.
        Ext.getStore('Courses').resetCurrentPage();//Se resetean los filtros de paginado para el store de Cursos.
        Ext.getStore('Users').resetCurrentPage();//Se resetean los filtros de paginado para el store de Usuarios.
    },

    onCommentTap: function (dataview, index, target, record, e, opt) {
        var me = this,
            store = dataview.getStore().getStoreId();
        if (e.getTarget('div.comment-like') || e.getTarget('div.like') || e.getTarget('div.comment-dislike')) {
            me.onLike(record, 'comment', store);
            return;
        }
    },

    onLike: function (record, likeOn, store) {
        var me = this,
            type, id;
        switch (likeOn) {
            case 'comment':
                type = 'comment';
                id = record.data.id;
                break;
            case 'publication':
                type = record.data.publication_type;
                id = record.data.publication_id;
                break;
        }
        me.saveLike(Core.Utils.toFirstUpperCase(type), id, record, store);
    },

    addHeaderToComments: function (params) {
        var commentsStore = Ext.getStore('Comments'),
            firstCommentRecord = commentsStore.getAt(0),
            data = params[0];
        if (firstCommentRecord) {
            firstCommentRecord.set('headerWall', data.headerWall);
            firstCommentRecord.set('headerAvatar', data.headerAvatar);
            firstCommentRecord.set('headerName', data.headerName);
            firstCommentRecord.set('headerBios', data.headerBios);
            firstCommentRecord.commit();
        } else {
            data.emptyStore = true;
            commentsStore.add(data);
        }
    },

    addHeaderToPublications: function () {
        var me = this,
            publicationsStore = Ext.getStore('Publications'),
            firstPublicationRecord = publicationsStore.getAt(0),
            params = me.getHeaderPublicationsData(),
            data = {};

        if (params){
            data.headerAvatar = params.avatar;
            data.headerTitle = params.title;
            data.headerPublicStatus = params.public_status;
            data.headerInitDate = params.init_date;
            data.headerFinishDate = params.finish_date;
            data.headerSilabus = params.silabus;
            data.headerId = params.id;
            data.showHeader = true;

            if (firstPublicationRecord) {
                firstPublicationRecord.set('headerAvatar', data.headerAvatar);
                firstPublicationRecord.set('headerTitle', data.headerTitle);
                firstPublicationRecord.set('headerPublicStatus', data.headerPublicStatus);
                firstPublicationRecord.set('headerInitDate', data.headerInitDate);
                firstPublicationRecord.set('headerFinishDate', data.headerFinishDate);
                firstPublicationRecord.set('headerSilabus', data.headerSilabus);
                firstPublicationRecord.set('headerId', data.headerId);
                firstPublicationRecord.set('showHeader', data.showHeader);
                firstPublicationRecord.commit();
            } else {
                data.emptyStore = true;
                publicationsStore.add(data);
            }
        }
    },
    /*  Called when an item in the menu is selected.
     */
    onMenuSelect:function(list, item, eOpts) {
        console.log('onselect');
        Ext.defer(this.closeMenu, 350, this);
    },
    closeMenu: function(duration) {
        var me       = this,
            duration = duration;

        me.moveMainContainer(me, 0, duration);
    },
    moveMainContainer: function(nav, offsetX, duration) {
        var me = this,
            duration  = duration ? duration : 200,
            container = me.getCardContainer(),
            draggable = container.draggableBehavior.draggable;

        draggable.setOffset(offsetX, 0, {
            duration: duration
        });

        if(offsetX === 0){
            container.setWidth('100%');
        }
    },
    onMenuButtonTap:function(){
        var me = this,
            duration = me.getMain().getMenu().duration;
        if (me.isClosed()) {
            me.openMenu(duration);
        } else {
            me.closeMenu(duration);
        }
    },
    isClosed: function() {
        return (this.getCardContainer().draggableBehavior.draggable.offset.x == 0);
    },
    openMenu: function(duration) {
        var me       = this,
            duration = duration ? duration : 200,
            offsetX  = this.getMain().getMenu().minWidth;

        me.moveMainContainer(me, offsetX, duration);
    },
    onMainContainerDragEnd:function(draggable, e, eOpts){
        var me = this,
            velocity  = Math.abs(e.deltaX / e.deltaTime),
            direction = (e.deltaX > 0) ? "right" : "left",
            offset    = Ext.clone(draggable.offset),
            threshold = parseInt(me.getMain().getMenu().minWidth * .70),
            container = me.getCardContainer();

        switch (direction) {
            case "right":
                offset.x = (velocity > 0.75 || offset.x > threshold) ? me.getMain().getMenu().minWidth : 0;
                container.setWidth('85%');
                break;
            case "left":
                offset.x = (velocity > 0.75 || offset.x < threshold) ? 0 : me.getMain().getMenu().minWidth;
                container.setWidth('100%');
                break;
        }

        me.moveMainContainer(me, offset.x);
    }

});