/**
 * @class Cursame.model.Publication
 * @extends Ext.data.model
 * model for Publications
 */
Ext.define('Cursame.model.Publication', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: "id",
                type: "int"
            },
            {
                name: "publication_type",
                type: "string",
                convert: function (v) {
                    return v ? v.toLowerCase() : 'comment';
                }
            },
            {
                name: "publication_id",
                type: "int"
            },
            {
                name: "user_id",
                type: "int"
            },
            {
                name: "publication",
                type: 'object'
            },
            {
                name: "network",
                type: 'object'
            },
            {
                name: 'avatar',
                type: 'string',
                mapping: 'publication',
                convert: function (v, r) {
                    return Cursame.URL + '/assets/imagex-c0ba274a8613da88126e84b2cd3b80b3.png';
                }
            },
            {
                name: 'course',
                mapping: 'courses',
                convert: function (v, r) {
                    return v ? v[0] : 'sin cursos' || r.get('publication');
                }
            },
            {
                name: 'user',
                mapping: 'publication',
                type: 'object',
                convert: function (v, r) {
                    return v ? v.user : 'sin user';
                }
            },
            {
                name: 'content',
                mapping: 'publication',
                type: 'string',
                convert: function (v, r) {
                    var content = '',
                        course = r.get('courses'),
                        user = r.get('user'),
                        publication = r.get('publication');
                    if (publication) {
                        switch (r.get('publication_type')) {
                            case 'discussion':
                                content = publication.title + ' </br> ';
                                content += publication.description_html;
                                break;
                            case 'delivery':
                                content = publication.title + ' </br> ';
                                content += publication.description_html;
                                break;
                            case 'comment':
                                content = publication.comment_html;
                                break;
                            case 'course':
                                content = publication.title + ' </br> ';
                                content += publication.silabus;
                                break;
                            case 'survey':
                                content = publication.name;
                                break;
                        }
                    }
                    return content;
                }
            },
            {
                name: 'title',
                type: 'string',
                mapping: 'publication',
                convert: function (v, r) {
                    var title = '',
                        course = r.raw.courses && r.raw.courses[0] ? r.raw.courses[0] : {title: 'Sin Titulo'},
                        user = v && v.user ? v.user : 'Usuario',
                        name = '';

                        if (user && !Ext.isEmpty(user.first_name)) {
                            name = user.first_name;
                        }
                        if (user && !Ext.isEmpty(user.last_name)) {
                            name += ' ' + user.last_name;
                        }
                        if (Ext.isEmpty(name)) {
                            name = 'Usuario';
                        }
                    if (course) {
                        switch (r.get('publication_type')) {
                            case 'discussion':
                                title = 'Discusión nueva ';
                                title += course ? 'en el curso de <b>' + course.title + '</b>' : '<b>en la red' + '</b>';
                                break;
                            case 'delivery':
                                title = 'Se ha creado una tarea en el curso <b>' + course.title + '</b>';
                                break;
                            case 'comment':
                                title = '<b>'+name+'</b>'+' ha comentado ';
                                title += course ? 'en el curso de <b>' + course.title + '</b>' : '<b>en la red' + '</b>';
                                break;
                            case 'course':
                                title = 'Curso nuevo en la red <b>' + course.title + '</b>';
                                break;
                            case 'survey':
                                title = 'Se ha creado un cuestionario en el curso <b>' + course.title + '</b>';
                                break;
                        }
                    }
                    return title;
                }
            },
            {
                name: 'created',
                type: 'date',
                mapping: 'created_at',
                convert: function (date, rec) {
                    return Core.Utils.timeAgo(date);
                }
            },
            {
                name: 'num_comments',
                type: 'int',
                mapping: 'publication',
                convert: function (publication, r) {
                    var comments = 0;
                    if (publication) {
                        if (publication.comments) {
                            comments = publication.comments.length
                        } else {
                            comments = publication;
                        }
                    }
                    return comments;
                }
            },
            {
                name: 'likes',
                type: 'object',
                mapping: 'publication',
                convert: function (publication, r) {
                    var likes = 0;
                    if (publication) {
                        if (publication.likes) {
                            likes = publication.likes;
                        } else {
                            likes = publication;
                        }
                    }
                    return likes;
                }
            },
            {
                name: 'headerAvatar',
                type: 'string',
                convert: function (headerAvatar, r) {
                    var url = Cursame.URL + '/assets/course-avatarx-0a909a23b940f3f1701b2e6065c29fe6.png';
                    if (headerAvatar) {
                        url = headerAvatar;
                        if(headerAvatar.search(Cursame.URL) == -1){
                            url = Cursame.URL + headerAvatar;
                        }
                    }
                    return url;
                }
            },
            {
                name: 'headerTitle',
                type: 'string'
            },
            {
                name: 'headerPublicStatus',
                type: 'string'
            },
            {
                name: 'emptyStore',
                type: 'string'
            },
            {
                name: 'headerInitDate',
                type: 'string'
            },
            {
                name: 'headerFinishDate',
                type: 'string'
            },
            {
                name: 'headerSilabus',
                type: 'string'
            },
            {
                name: 'headerId',
                type: 'int'
            },
            {
                name: 'showHeader',
                type: 'string'
            }
        ],
        proxy: {
            type: 'jsonp',
            url: Cursame.APIURL + 'api/publications.json',
            reader: {
                type: 'json',
                rootProperty: 'publications'
            }
        }
    }
});