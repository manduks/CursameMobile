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
                return Cursame.URL  + user.avatar.url;
            }
        },{
            name: 'num_comments',
            type: 'int',
            mapping: 'comments',
            convert: function (comments, r){
                return comments.length;
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