/**
 * @class Cursame.store.CommentsComments
 * @extends Core.data.Store
 * This is the store to handle the comments of comments
 */
Ext.define('Cursame.store.CommentsComments', {
    extend: 'Core.data.Store',
    requires:['Cursame.model.CommentComment'],
    config:{
        model:'Cursame.model.CommentComment',
        autoLoad:false
    }
});