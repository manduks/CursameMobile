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
                var name = 'Usuario';
                if(user && user.first_name && user.last_name){
                    name = user.first_name+' '+user.last_name;
                }
				return name;
            }
        },{
            name: 'user_avatar',
            type: 'string',
            mapping:'user',
            convert: function (user,r) {
                var url = '';
                if(user && user.avatar){
                    url = user.avatar.url;
                }
                return url;
            }
        },{
            name: 'num_comments',
            type: 'int',
            mapping: 'comments',
            convert: function (comments, r){
                var length = comments? comments.length: 0;
                return length;
            }
        },{
            name: 'likes',
            type: 'int',
            mapping: 'votes',
            convert: function (votes, r){
                var length = votes? votes.length: 0;
                return length;
            }
        },
        {
            name:'headerWall',
            type:'string',
            convert:function(headerWall, r){
                var url = Cursame.URL+'/assets/portada.png';
                if(headerWall){
                    url = Cursame.URL+headerWall
                }
                return url;
            }
        },
        {
            name:'headerAvatar',
            type:'string',
            convert:function(headerAvatar, r){
                var url = Cursame.URL+'/assets/course-avatarx-0a909a23b940f3f1701b2e6065c29fe6.png';
                if(headerAvatar){
                    url = Cursame.URL+headerAvatar
                }
                return url;
            }
        },
        {
            name:'headerName',
            type:'string',
            convert: function (headerName,r) {
                var name = 'Usuario';
                if(headerName && headerName.first_name && headerName.last_name){
                    name = headerName.first_name + ' ' + headerName.last_name;
                }
                return name;
            }
        },
        {
            name:'headerBios',
            type:'string'
        },
        {
            name:'emptyStore',
            type:'string'
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