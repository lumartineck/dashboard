/**
 * Por Luis Enrique
 * @class App.view.GridPanel
 * Grid que muestra los datos del dashboard
 *
 * @extends Ext.grid.Panel
 * @autor LCC. Luis Enrique Martínez Gómez<br>
 *        enrique@codetlan.com<br>
 *        @l_nrique
 * @fecha Agosto de 2012. Mexico DF
 *
 */
Ext.define('App.view.GridPanel', {

    extend:'Ext.grid.Panel',

    initComponent:function () {
        var _this = this;

        Ext.define('Cups', { // definimos el modelo de nuestros datos
            extend:'Ext.data.Model',
            idProperty:'name',
            fields:_this.buildFields()
        });

        _this.store = _this.buildStore();
        _this.columns = _this.buildColumns();

        this.callParent(arguments);
    },

    buildColumns:function () { // creamos las columnas de nuestro grid
        var cols = [
            {text:'Name', flex:1, sortable:true, dataIndex:'name'},
            {text:'Gender', flex:1, sortable:true, dataIndex:'gender'},
            {text:'Age', flex:1, sortable:true, dataIndex:'age'},
            {text:'Cups of coffe a day', flex:1, sortable:true, dataIndex:'cups'}
        ];

        return cols;
    },

    buildStore:function () { // creamos el ArrayStore para nuestro grid
        var store = Ext.create('Ext.data.ArrayStore', {
            model:'Cups',
            data:[
                ['Michael', 'Male', 12, 5],
                ['Elisa', 'Female', 20, 7],
                ['Robert', 'Male', 7, 3],
                ['John', 'Male', 54, 6],
                ['Jessica', 'Female', 22, 6],
                ['Aaron', 'Male', 3, 1],
                ['Elizabeth', 'Female', 42, 8],
                ['Naomi', 'Female', 33, 6]
            ]
        });

        return store;
    },

    buildFields:function () { // creamos los campos de nuestro modelo
        var fields = [
            {name:'name', type:'string'},
            {name:'gender', type:'string'},
            {name:'age', type:'int'},
            {name:'cups', type:'float'}
        ];

        return fields;
    }
});