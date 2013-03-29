/**
 * @class Cursame.model.Publication
 * @extends Ext.data.model
 * model for Publications
 */
Ext.define('Cursame.model.Publication', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
                name: "id",
                type: "int"
            }, {
                name: "publication_type",
                type: "string",
                convert: function (v) {
                    return v ? v.toLowerCase() : 'comment';
                }
            }, {
                name: "publication_id",
                type: "int"
            }, {
                name: "user_id",
                type: "int"
            }, {
                name: "publication",
                type: 'object'
            }, {
                name: "network",
                type: 'object'
            }, {
                name: 'avatar',
                type: 'string',
                mapping: 'publication',
                convert: function (v, r) {
                    return Cursame.ASSETSURL+'resources/images/curso.jpg';
                }
            },{
                name:'course',
                type: 'object'
            },{
                name:'user',
                type: 'object'
            },{
                name:'content',
                mapping:'publication',
                type:'string',
                 convert: function (v, r) {
                    var content = '',
                        course = r.get('course'),
                        user = r.get('user'),
                        publication = r.get('publication');
                    switch(r.get('publication_type')){
                        case 'discussion':
                            content = publication.title+' </br> ';
                            content += publication.description;
                        break;
                        case 'delivery':
                            content = publication.title+' </br> ';
                            content += publication.description;
                        break;
                        case 'comment':
                            content = publication.comment_html;
                        break;
                        case 'course':
                            content = publication.title+' </br> ';
                            content += publication.silabus;
                        break;
                        case 'survey':
                            content = publication.name;
                        break;
                    }
                    return content;
                }
            },{
                name: 'title',
                type: 'string',
                mapping: 'publication',
                convert: function (v, r) {
                    var title = '',
                        course = r.get('course'),
                        user = r.get('user');
                    switch(r.get('publication_type')){
                        case 'discussion':
                            title = 'Discusión nueva ';
                            title += course ? 'en el curso de <b>'+ course.title+'</b>': '<b>en la red' +'</b>';
                        break;
                        case 'delivery':
                            title = 'Se ha creado una tarea en el curso <b>'+ course.title+'</b>';
                        break;
                        case 'comment':
                            title = 'Comentario  ';
                            title += course ? 'en el curso de <b>'+ course.title+'</b>': '<b>en la red' +'</b>';
                        break;
                        case 'course':
                            title = 'Curso nuevo en la red <b>'+course.title+'</b>';
                        break;
                        case 'survey':
                            title = 'Se ha creado un cuestionario en el curso <b>'+ course.title+'</b>';
                        break;
                    }
                    return title;
                }
            }, {
                name: 'created',
                type: 'date',
                mapping: 'created_at',
                convert: function (date, rec) {
                    try {
                        var now = Math.ceil(Number(new Date()) / 1000),
                            dateTime = Math.ceil(Number(new Date(date)) / 1000),
                            diff = now - dateTime,
                            str;

                        if (diff < 60) {
                            return String(diff) + ' s';
                        } else if (diff < 3600) {
                            str = String(Math.ceil(diff / (60)));
                            return str + (str == "1" ? ' m' : ' m');
                        } else if (diff < 86400) {
                            str = String(Math.ceil(diff / (3600)));
                            return str + (str == "1" ? ' h' : ' h');
                        } else if (diff < 60 * 60 * 24 * 365) {
                            str = String(Math.ceil(diff / (60 * 60 * 24)));
                            return str + (str == "1" ? ' d' : ' d');
                        } else {
                            return Ext.Date.format(new Date(date), 'jS M \'y');
                        }
                    } catch (e) {
                        return '';
                    }
                }
            },{
            name: 'num_comments',
            type: 'int',
            mapping: 'comments',
            convert: function (comments, r){
                return comments.length;
            }
        },{
            name: 'likes',
            type: 'object',
            mapping: 'publication',
            convert: function (publication, r){
                var likes;
                if(publication.votes){
                    likes =  publication.votes.length
                } else {
                    likes = publication;
                }
                return likes;
            }
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