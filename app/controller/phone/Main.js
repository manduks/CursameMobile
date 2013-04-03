/**
 * @class Cursame.controller.phone.Main
 * @extends Cursame.controller.Main
 * Main controller of the phone version
 */
Ext.define('Cursame.controller.phone.Main', {
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
            menu: 'navigationmenu',
            publicationNavigationView: 'publicationsnavigationview',
            discussionContainer: 'discussioncontainer',
            deliveryContainer: 'deliverycontainer',
            commentContainer: 'commentcontainer',
            notificationNavigationView: 'notificationnavigationview',
            userNavigationView: 'usernavigationview',
            commentsPanel: 'commentspanel',
            userWall: 'userwall'
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
            'userslist':{
                itemtap:'onUserTap'
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
        setTimeout(function(){
            me.onMenuTap(me.getMenu(), 1);
        }, 500);
    },
    /**
     *
     */
    getData: function () {
        var user, userName, avatar;

        user = Ext.decode(localStorage.getItem("User"));
        userName = user.first_name + ' ' + user.last_name;
        avatar = user.avatar.url ? Cursame.URL+user.avatar.url : Cursame.URL+'/assets/imagex-c0ba274a8613da88126e84b2cd3b80b3.png';
        return [{
            name: userName,
            icon: avatar,
            group: 'PERFIL'
        }, {
            name: 'Inicio',
            icon: Cursame.ASSETSURL+'resources/images/muro.png',
            group: 'MURO'
        }, {
            name: 'Notificaciones',
            icon: Cursame.ASSETSURL+'resources/images/notification.png',
            numNotifications: user.notifications.length,
            group: 'MURO'
        }, {
            name: 'Cursos',
            icon: Cursame.ASSETSURL+'resources/images/cursos.png',
            group: 'CURSOS'
        }, {
            name: 'Comunidad',
            icon: Cursame.ASSETSURL+'resources/images/comunidad.png',
            group: 'COMUNIDAD'
        }, {
            name: 'Salir',
            icon: Cursame.ASSETSURL+'resources/images/salir.png',
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
                me.loadCommentsByType('User',user.id,me.addHeaderToComments.bind(me,[data]));
                break;
            case 1:
                me.getCardContainer().animateActiveItem(1, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Publications').setParams({}, true);
                Ext.getStore('Publications').load();
                me.setActiveNavigationView(me.getPublicationNavigationView());
                break;
            case 2:
                me.getCardContainer().animateActiveItem(2, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Notifications').setParams({});
                Ext.getStore('Notifications').load();
                me.setActiveNavigationView(me.getNotificationNavigationView());
                break;
            case 3:
                me.getCardContainer().animateActiveItem(3, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Courses').setParams({});
                Ext.getStore('Courses').load();
                me.setActiveNavigationView(me.getCourseNavigationView());
                break;
            case 4:
                me.getCardContainer().animateActiveItem(4, {
                    type: 'slide',
                    direction: 'left'
                });
                Ext.getStore('Users').setParams({});
                Ext.getStore('Users').load();
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
            me.onLike(record, 'publication');
            return;
        }
        if (e.getTarget('div.comment')) {
            commentsStore.setParams({
                commentable_type: Core.Utils.toFirstUpperCase(record.data.publication_type),
                commentable_id: record.data.publication_id
            });
            commentsStore.load();

            var panel = Ext.create('Cursame.view.comments.CommentsPanel', {
                objectData: record.getData(),
                listeners:{
                    hide:function(t){
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
        publication.user_name = user.first_name +' '+ user.last_name;
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
                me.loadCommentsByType('Discussion',publication.id);
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
                me.loadCommentsByType('Delivery',publication.id);
                break;
            case 'comment':
                me.getActiveNavigationView().push({
                    xtype: 'commentwall',
                    title:Core.Lang.es.comment,
                    commentableType: 'Comment',
                    commentableId: publication.id
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

    onCommentUserTap: function (dataview, index, target, record, e, opt) {
        var me = this,
            cComments = Ext.getStore('CommentsComments');
        Ext.getStore('CommentsComments').resetCurrentPage();//Se resetea el store de Comments Comments para inicializar la paginación
        if (e.getTarget('div.like')) {
            me.onLike(record, 'comment');
            return;
        }
        if (e.getTarget('div.comment')) {
            var commentsPanel = Ext.create('Cursame.view.comments.CommentsPanel', {
                objectData: record.getData(),
                listeners:{
                    hide:function(t){
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
    onNotificationTap:function  (dataview, index, target, record, e, opt) {
        var me = this,creator,course,
            data = record.get('notificator'),
            navigationView = me.getNotificationNavigationView();
        switch(record.get('kind')){
            case 'user_comment_on_network':
                navigationView.push({
                    xtype: 'commentwall',
                    title:Core.Lang.es.comment,
                    commentableType: 'Comment',
                    commentableId: data.id
                });
                creator = record.get('creator');
                data.user_name = creator.first_name +' '+ creator.last_name;
                data.timeAgo = Core.Utils.timeAgo(data.created_at);
                data.avatar = creator.avatar.url;

                me.getCommentContainer().setData(data);
                me.loadCommentsByType('Comment',data.id);
            break;
            case 'user_comment_on_course':
                navigationView.push({
                    xtype: 'commentwall',
                    title:Core.Lang.es.comment,
                    commentableType: 'Comment',
                    commentableId: data.id
                });
                creator = record.get('creator');
                data.user_name = creator.first_name +' '+ creator.last_name;
                data.timeAgo = Core.Utils.timeAgo(data.created_at);
                data.avatar = creator.avatar.url;

                me.getCommentContainer().setData(data);
                me.loadCommentsByType('Comment',data.id);
            break;
            case 'new_delivery_on_course':
                navigationView.push({
                    xtype: 'deliverywall',
                    title:Core.Lang.es.delivery,
                    commentableType: 'Delivery',
                    commentableId: data.id
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
     * @param  {string} commentableType
     * @param  {int} commentableId
     * @return 
     */
    loadCommentsByType: function (commentableType,commentableId, callback) {
        var me = this,
            commentsStore = Ext.getStore('Comments');

        commentsStore.setParams({
            commentable_type: commentableType,
            commentable_id: commentableId
        });
        commentsStore.load(callback);
    },
    /**
     * push course
     */
    pushCourseToView: function (view, data) {
        var me = this,
            publicationsStore = Ext.getStore('Publications');
        view.push({
            xtype: 'coursewall',
            title: data.id.title
        });
        //me.getCourseContainer().setData(data);
        publicationsStore.setParams({
            publicacionId: data.id,
            type: 'Course'
        });
        // cargamos las publicaciones del curso
        publicationsStore.load(me.addHeaderToPublications.bind(me, [data]));
    },

    onUserTap:function  (dataview, index, target, record, e, opt) {
        var user =  record.getData(),data, me = this;
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
        me.loadCommentsByType('User',user.id,me.addHeaderToComments.bind(me,[data]));
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
            type, id, store;

        if (comment) {
            if(data.publication_type && data.publication_id){
                type = data.publication_type;
                id = data.publication_id;
                store = Ext.getStore('Comments');
            } else {
                type = 'Comment';
                id = data.id;
                store = Ext.getStore('CommentsComments');
            }

            me.saveComment(comment, type, id, store);
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

        if (comment && list.getCommentableType && list.getCommentableId
                && list.getCommentableType() && list.getCommentableId()) {
            me.saveComment(comment, list.getCommentableType(), list.getCommentableId(), Ext.getStore('Comments'));
        }
    },
    saveComment: function (comment, commentableType, commentableId, store, form) {
        var me = this;
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
                if (form){
                    form.hide();
                    form.destroy();
                }
                me.getMain().setMasked(false);
                store.resetCurrentPage();
                store.setParams({
                    commentable_type: commentableType,
                    commentable_id: commentableId
                });
                store.load();
            }
        });
    },
    /**
     * Este metodo guarda los likes
     * @param  {String} type  tipo de elemento qeu obtiene el like
     * @param  {int} id    identificador del evento
     * @param  {object} store el store a recargar para ver los likes
     * @return {object}       el store del like
     */
    saveLike: function (type, id, record){
        var me = this;
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
                record.set('likes','1');
                record.commit();
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
        values.courseId = form.getObjectId();

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
        Ext.getStore('Publications').load();
    },

    resetCurrentPageOnStores:function(){
        Ext.getStore('Comments').resetCurrentPage();//Se resetean los filtros de paginado para el store de Comentarios.
        Ext.getStore('Publications').resetCurrentPage();//Se resetean los filtros de paginado para el store de Publicaciones.
        Ext.getStore('Notifications').resetCurrentPage();//Se resetean los filtros de paginado para el store de Notificaciones.
        Ext.getStore('Courses').resetCurrentPage();//Se resetean los filtros de paginado para el store de Cursos.
        Ext.getStore('Users').resetCurrentPage();//Se resetean los filtros de paginado para el store de Usuarios.
    },

    onCommentTap:function(dataview, index, target, record, e, opt) {
        var me = this;
        if (e.getTarget('div.comment-like') || e.getTarget('div.like')) {
            me.onLike(record, 'comment');
            return;
        }
    },

    onLike:function(record, likeOn){
        var me = this,
            type, id;
        switch(likeOn){
            case 'comment':
                type = 'comment';
                id = record.data.id;
                break;
            case 'publication':
                type = record.data.publication_type;
                id = record.data.publication_id;
                break;
        }
       me.saveLike(Core.Utils.toFirstUpperCase(type),id,record);
    },

    addHeaderToComments:function(params){
        var commentsStore = Ext.getStore('Comments'),
            firstCommentRecord = commentsStore.getAt(0),
            data = params[0];
        if(firstCommentRecord){
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

    addHeaderToPublications:function(params){
        var publicationsStore = Ext.getStore('Publications'),
            firstPublicationRecord = publicationsStore.getAt(0),
            data = {};

        data.headerAvatar = params[0].avatar;
        data.headerTitle = params[0].title;
        data.headerPublicStatus = params[0].public_status;
        data.headerInitDate = params[0].init_date;
        data.headerFinishDate = params[0].finish_date;
        data.headerSilabus = params[0].silabus;
        data.headerId = params[0].id;
        data.showHeader = true;

        if(firstPublicationRecord){
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
});