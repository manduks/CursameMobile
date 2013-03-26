/**
 * @class Cursame.view.discussions.DiscussionContainer
 * @extends Ext.Container
 * This is the discussion container
 * @manduks
 */
Ext.define('Cursame.view.discussions.DiscussionContainer', {
    extend: 'Ext.Container',
    xtype: 'discussioncontainer',
    requires: ['Cursame.view.discussions.DiscussionTpl'],
    config: {
        docked: 'top',
        addedListener: false,
        tpl: Ext.create('Cursame.view.discussions.DiscussionTpl')
    }
});