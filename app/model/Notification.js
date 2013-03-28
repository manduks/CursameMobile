/*
 * @class Cursame.model.Notification
 * @extends Ext.data.Model
 * This is the model for the tnotifications
 */
Ext.define('Cursame.model.Notification', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'kind',
            type: 'string'
        }, {
            name: 'text',
            mapping:'kind',
            type: 'string',
            convert:function  (value,r) {
                var text,avatar = './resources/images/curso.jpg',
                    obj = r.get('notificator_type'),
                    notificator = obj.notificator,
                    creator = obj.creator,
                    course = obj.course;

                switch(value){
                    case 'user_comment_on_network':
                        avatar = Cursame.URL+creator.avatar.url;
                        text = '<a href="">'+creator.first_name+' '+ creator.last_name+'</a> ha comentado en al red';
                    break;
                    case 'user_comment_on_course':
                        text = 'Armando ha comentado en el curso';
                    break;
                    case 'new_delivery_on_course':
                        text = 'Se cre&oacute; la tarea <a href="">"'+notificator.title+'"</a> en el curso <a href="">'+course.title+'</a>';
                    break;
                    case 'new_public_course_on_network':
                        text = 'Se cre&oacute; el curso <a href="">'+notificator.title+'</a>';
                    break;
                    case 'new_survey_on_course':
                        text = 'Se ha creado un cuestionario en el curso de Programación';
                    break;
                }

                return [
                    '<div class="avatar-notification">',
                        '<img style = "width:32px; height:32px" src="'+ avatar +'"> ',
                    '</div>',
                    '<div class="post-notification">',
                        '<p>'+text+'</p>',
                    '</div>'
                ].join('');
            }
        },{
            name: 'created_at',
            type: 'date'
        }, {
            name: 'notificator_id',
            type: 'int'
        }, {
            name: 'notificator_type',
            type: 'object'
        }, {
            name: 'user',
            type: 'object',
            mapping:'notificator_type.user'
        }, {
            name: 'notificator',
            type: 'object',
            mapping:'notificator_type.notificator'
        }, {
            name: 'creator',
            type: 'object',
            mapping:'notificator_type.creator'
        } , {
            name: 'course',
            type: 'object',
            mapping:'notificator_type.course'
        } ],
        proxy: {
            type: 'jsonp',
            url: Cursame.APIURL + 'api/notifications.json',
            reader: {
                type: 'json',
                rootProperty: 'notifications'
            }
        }
    }
});

/*
   t.integer  "notificator_id"
    t.string   "notificator_type"
    t.integer  "user_id"
    t.string   "kind"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
    t.boolean  "active",           :default => true
*/