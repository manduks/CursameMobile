/**
 * @class Cursame.view.LoginForm
 * @extends Ext.form.Panel
 * This is the login panel for the Cursame app
 */
 Ext.define('Cursame.view.LoginForm', {
    extend: 'Ext.form.Panel',
    xtype: 'loginform',

    requires: [
    'Ext.form.FieldSet',
    'Ext.field.Email',
    'Ext.field.Password',
    'Ext.Img'],

    config: {
        //ui: 'login',
        padding: '15 15 15 15',
        baseCls: 'background',
        items: [{
            xtype: 'image',
            margin: '0 0 10 0',
            height: 80,
            src: Cursame.ASSETSURL+'resources/images/cursame.png'
        }, {
            xtype: 'fieldset',
            defaults: {
                required: true
            },
            items: [{
                xtype: 'emailfield',
                name: 'email',
                placeHolder: Core.Lang.es.email,
                //value: 'info+pasteje@cursa.me',
                //value: 'iam@armando.mx',
                clearIcon: true
                }, {
                    xtype: 'passwordfield',
                    name: 'password',
                    placeHolder: Core.Lang.es.password,
                    //value: 'cursamepasteje7',
                    //value: 'mmmmmm',
                    clearIcon: true
                    }]
        }, {
            xtype: 'fieldset',
            items: [{
                xtype: 'button',
                text: '<div class = "movi-color">' + Core.Lang.es.login + '</div>',
                ui: 'accept',
                scope: this,
                handler: function (btn) {
                    var form = btn.up('formpanel'),
                    obj = form.getValues();
                    form.setMasked({
                        xtype: 'loadmask',
                        message: Core.Lang.es.starting
                    });
                    Core.Utils.ajax({
                        url: 'tokens/create.json',
                        params: {
                            email: obj.email ,
                            password: obj.password
                        },
                        success: function(response) {
                            form.setMasked(false);
                            if(response.response.success){
                                localStorage.setItem("Token", response.response.token);
                                localStorage.setItem("UserId", response.response.user.id);
                                localStorage.setItem("User", Ext.encode(response.response.user));
                                form.fireEvent("logeado", form);
                            }else{
                                form.setMasked({
                                    xtype: 'loadmask',
                                    indicator:false,
                                    message: "Favor de verificar el usuario o la contraseña"
                                });
                                setTimeout(function(){
                                    form.setMasked(false);
                                },1000);
                            }
                        }
                    });
                }
            }]
        }/*, {
            xtype: 'button',
            text: '<div class = "movi-color" style = "color:white;">' + Core.Lang.es.passwordRecover + '</div>',
            baseCls: 'empty',
            cls: 'empty',
            handler: function (btn) {
                alert('recuperar contraseña');
            }
        }*/]
    }
});