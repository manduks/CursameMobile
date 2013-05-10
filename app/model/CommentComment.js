/**
 * @class Cursame.model.Comment
 * @extends Ext.data.Model
 * Description
 */
Ext.define('Cursame.model.CommentComment', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'title',
                type: 'string'
            },
            {
                name: 'comment',
                type: 'string'
            },
            {
                name: 'comment_html',
                type: 'string'
            },
            {
                name: 'commentable_id',
                type: 'int'
            },
            {
                name: 'commentable_type',
                type: 'string'
            },
            {
                name: 'user_name',
                type: 'string',
                mapping: 'user',
                convert: function (user, r) {
                    var name = '';
                    if (user && !Ext.isEmpty(user.first_name)) {
                        name = user.first_name;
                    }
                    if (user && !Ext.isEmpty(user.last_name)) {
                        name += ' ' + user.last_name;
                    }
                    if (Ext.isEmpty(name)) {
                        name = 'Usuario';
                    }
                    return name;
                }
            },
            {
                name: 'user_avatar',
                type: 'string',
                mapping: 'user',
                convert: function (user, r) {
                    return user.avatar.url;
                }
            },
            {
                name: 'num_comments',
                type: 'int',
                mapping: 'comments',
                convert: function (comments, r) {
                    var num_comments = 0;
                    if (comments && comments.length) {
                        num_comments = comments.length;
                    } else if (comments && comments != '') {
                        num_comments = comments;
                    }
                    return num_comments;
                }
            },
            {
                name: 'likes',
                type: 'int',
                mapping: 'likes',
                convert: function (votes, r) {
                    var likes = 0;
                    if (votes) {
                        likes = votes;
                    } else {
                        likes;
                    }
                    return likes;
                }
            },
            {
                name: 'user',
                type: 'object'
            },
            {
                name: 'created',
                type: 'date',
                mapping: 'created_at',
                convert: function (date, rec) {
                    return Core.Utils.timeAgo(date);
                }
            }
        ],
        proxy: {
            type: 'jsonp',
            url: Cursame.APIURL + 'api/comments.json',
            reader: {
                type: 'json',
                rootProperty: 'comments'
            }
        }
    }
});