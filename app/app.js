/**
 * This is the main code for the application
 */

Ext.Loader.setConfig({
    enabled:true
});
Ext.application({
    name: 'App',

    requires:['App.view.Dashboard'],

    launch: function() {
        Ext.create('Ext.Window',{
            width:700,
            height:500,
            maximizable:true,
            title:'Dashboard',
            autoScroll:true,
            frame:false,
            layout:'fit',
            items:[{
                xtype:'dashboard'
            }]
        }).show();
    }
});