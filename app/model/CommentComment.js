/**
 * @class Cursame.model.Comment
 * @extends Ext.data.Model
 * Description
 */
Ext.define('Cursame.model.CommentComment', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'title',
            type: 'string'
        }, {
            name: 'comment',
            type: 'string'
        }, {
            name: 'comment_html',
            type: 'string'
        }, {
            name: 'commentable_id',
            type: 'int'
        }, {
            name: 'commentable_type',
            type: 'string'
        }, {
            name: 'user_name',
            type: 'string',
            mapping:'user',
            convert: function (user,r) {
                return user.first_name+' '+user.last_name;
            }
        }, {
            name: 'user_avatar',
            type: 'string',
            mapping:'user',
            convert: function (user,r) {
                return user.avatar.url;
            }
        },{
            name: 'num_comments',
            type: 'int',
            mapping: 'comments',
            convert: function (comments, r){
                var num_comments = 0;
                if (comments && comments.length) {
                    num_comments = comments.length;
                } else if(comments && comments != '') {
                    num_comments = comments;
                }
                return num_comments;
            }
        },{
            name: 'likes',
            type: 'int',
            mapping: 'likes',
            convert: function (votes, r){
                var likes = 0;
                if (votes) {
                    likes = votes;
                } else {
                    likes;
                }
                return likes;
            }
        },{
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
        }],
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