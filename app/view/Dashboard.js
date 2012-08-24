/**
 * Por Luis Enrique
 * @class App.view.Dashboard
 * Panel principal del dashboard
 *
 * @extends Ext.panel.Panel
 * @autor LCC. Luis Enrique Martínez Gómez<br>
 *        enrique@codetlan.com<br>
 *        @l_nrique
 * @fecha Agosto de 2012. Mexico DF
 *
 */
Ext.define('App.view.Dashboard', {

    extend:'Ext.panel.Panel',
    alias:'widget.dashboard',

    initComponent:function () {
        var _this = this;

        _this.layout = 'border';
        _this.items = _this.buildItems();
        _this.buildPortlets();

        _this.callParent(arguments);
    },

    buildItems:function () { // creamos los items en este caso las columnas del portal
        var _this = this,
            config = {
                columnWidth:0.33,
                style:'padding:10px 0 10px 10px'
            };

        _this.columnas = [];
        _this.columnas.push(Ext.create('App.view.ux.PortalColumn', config));
        _this.columnas.push(Ext.create('App.view.ux.PortalColumn', config));
        _this.columnas.push(Ext.create('App.view.ux.PortalColumn', config));

        _this.portal = Ext.create('App.view.ux.PortalPanel', {
            region:"center",
            items:_this.columnas
        });
        return _this.portal;
    },

    buildPortlets:function () { // agregamos los componentes a las columnas del portlet
        var _this = this,
            slider = Ext.create('Ext.slider.Single', {
                fieldLabel:'Age',
                labelAlign:'top',
                width:200,
                values:[10, 80],
                increment:10,
                minValue:0,
                maxValue:100,
                listeners:{
                    scope:_this,
                    change:_this.onSliderChange
                }
            });

        _this.columnas[0].add({
            title:'Filters',
            closable:false,
            items:Ext.create('Ext.panel.Panel', {
                layout:'form',
                items:[slider]
            })
        });

        _this.columnas[1].add({
            title:'Chart',
            items:Ext.create('App.view.PieChart', {id:'pie' + _this.id}),
            listeners:{
                'close':Ext.bind(this.onPortletClose, this)
            }
        });

        _this.columnas[2].add({
            title:'Grid',
            items:Ext.create('App.view.GridPanel', {id:'grid' + _this.id}),
            listeners:{
                'close':Ext.bind(this.onPortletClose, this)
            }
        });
    },

    onPortletClose:function (portlet) {
        Ext.Msg.alert('Status', '"' + portlet.title + '" was removed');
    },

    onSliderChange:function (slider, newValue, thumb, eOpts) { // Agregamos los filtros a los stores de los componentes
        var _this = this,
            pieStore = Ext.getCmp('pie' + _this.id).store,
            gridStore = Ext.getCmp('grid' + _this.id).store;

        pieStore.clearFilter(false);
        gridStore.clearFilter(false);

        pieStore.filter([
            {filterFn:function (item) {
                return item.get("age") > slider.thumbs[0].value;
            }},
            {filterFn:function (item) {
                return item.get("age") < slider.thumbs[1].value;
            }}
        ]);

        gridStore.filter([
            {filterFn:function (item) {
                return item.get("age") > slider.thumbs[0].value;
            }},
            {filterFn:function (item) {
                return item.get("age") < slider.thumbs[1].value;
            }}
        ]);
    }
});