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
            convert:function(v){
                return v ? v.toLowerCase():'comment';
            }
        }, {
            name: "publication_id",
            type: "int"
        }, {
            name: "user_id",
            type: "int"
        }, {
            name: "publication"
        },{
            name:'avatar',
            type:'string',
            mapping:'publication',
            convert:function(v,r){
                return 'https://secure.gravatar.com/avatar/8e88e4c70a9b1e682549d614a9512422?s=420&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png';
            }
        },{
            name:'title',
            type:'string',
            mapping:'publication',
            convert:function(v,r){
                return '<b>Le&oacute;n Rangel</b> publica ahora en <b>el curso de tecnolog&iacute;a</b>';
            }
        }],
        proxy: {
            type: 'jsonp',
            url: Cursame.APIURL  + 'api/publications.json',
            reader: {
                type: 'json',
                rootProperty: 'publications'
            }
        }
    }
});