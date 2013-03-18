/**
 * @class Cursame.model.Course
 * @extends Ext.data.Model
 * The model for the courses
 */
Ext.define('Cursame.model.Course', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'title',
            type: 'string'
        }, {
            name: 'silabus',
            type: 'string'
        }, {
            name: 'avatar',
            type: 'string',
            convert: function (avatar,r) {
				return Cursame.URL  + avatar.url;
            }
        }, {
            name: 'coverphoto',
            type: 'string',
            convert: function (coverphoto,r) {
                return Cursame.URL  + coverphoto.url;
            }
        } ],
        proxy: {
            type: 'jsonp',
            url: Cursame.APIURL + 'api/courses.json',
            reader: {
                type: 'json',
                rootProperty: 'courses'
            }
        }
    }
});

/*
   t.string   "title"
    t.text     "silabus"
    t.datetime "init_date"
    t.datetime "finish_date"
    t.datetime "created_at",                                  :null => false
    t.datetime "updated_at",                                  :null => false
    t.string   "public_status"
    t.string   "avatar"
    t.string   "coverphoto"
    t.integer  "delivery_id"
    t.integer  "survey_param_evaluation"
    t.integer  "delivery_param_evaluation"
    t.integer  "network_id"
    t.boolean  "active_status",             :default => true

 */