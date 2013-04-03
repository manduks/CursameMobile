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
                console.info(comments);
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
            mapping: 'votes',
            convert: function (votes, r){
                var likes = 0;
                    if (votes) {
                        likes = votes.length
                    } else {
                        likes;
                    }
                return likes;
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
                var url = Cursame.URL+'/assets/imagex-c0ba274a8613da88126e84b2cd3b80b3.png';
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