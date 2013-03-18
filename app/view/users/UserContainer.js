/**
 * @class Cursame.view.users.UserContainer
 * @extends Ext.List
 * This component is the user container for the wall
 * @manduks
 */
Ext.define('Cursame.view.users.UserContainer', {
    extend: 'Ext.Container',
	xtype:'usercontainer',
	requires:['Cursame.view.users.UserProfileTpl'],

    config: {
		docked: 'top',
		data:{
			name:'Armando Gonzalez',
			wall:'http://1.bp.blogspot.com/-L3PW_oxd7wE/TlPVPK50HwI/AAAAAAAALn8/RN4UpwowJek/s1600/Paisaje-Monta%25C3%25B1a-1600x1200.jpg',
			avatar:'https://secure.gravatar.com/avatar/8e88e4c70a9b1e682549d614a9512422?s=420&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png',
			bio:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`,s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
		},
		tpl: Ext.create('Cursame.view.users.UserProfileTpl')
    }
});