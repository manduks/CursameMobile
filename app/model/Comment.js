/**
 * @class Cursame.model.Comment
 * @extends Ext.data.Model
 * Description
 */
Ext.define('Cursame.model.Comment', {
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
        } ],
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

/*
 t.string   "title",            :limit => 50, :default => ""
    t.text     "comment"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.integer  "user_id"
    t.string   "role",                           :default => "comments"
    t.datetime "created_at",                                             :null => false
    t.datetime "updated_at",                                             :null => false
    t.text     "comment_html"
    t.integer  "network_id"

 */