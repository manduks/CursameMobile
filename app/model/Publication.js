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
            type: "string"
        }, {
            name: "publication_id",
            type: "int"
        }, {
            name: "user_id",
            type: "int"
        }, {
            name: "publication"
        }],
        proxy: {
            type: 'jsonp',
            url: 'http://localhost:3000/api/' + 'api/publications.json',
            reader: {
                type: 'json',
                rootProperty: 'publications'
            }
        }
    }
});