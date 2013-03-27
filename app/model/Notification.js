/**
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
                var text='',
                    notificator = r.get('notificator');
                switch(value){
                    case 'user_comment_on_network':
                        text = 'Armando ha comentado en al red';
                    break;
                    case 'user_comment_on_course':
                         text = 'Armando ha comentado en el curso';
                    break;
                    case 'new_delivery_on_course':
                         text = 'Se ha creado una tarea en el curso de Programación';
                    break;
                    case 'new_public_course_on_network':
                         text = 'Se ha creado el curso <b>'+notificator.title+'</b>';
                    break;
                    case 'new_survey_on_course':
                         text = 'Se ha creado un cuestionario en el curso de Programación';
                    break;
                }
                return text;
            }
        }, {
            name: 'created_at',
            type: 'date'
        }, {
            name: 'notificator_id',
            type: 'int'
        }, {
            name: 'notificator_type',
            type: 'string'
        }, {
            name: 'user',
            type: 'object',
            mapping:'user'
        }, {
            name: 'notificator',
            type: 'object',
            mapping:'notificator'
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