/**
 * Por Luis Enrique
 * @class App.view.PieChart
 * Grafica de pie del dashboard
 *
 * @extends Ext.chart.Chart
 * @autor LCC. Luis Enrique Martínez Gómez<br>
 *        enrique@codetlan.com<br>
 *        @l_nrique
 * @fecha Agosto de 2012. Mexico DF
 *
 */
Ext.define('App.view.PieChart', {

    extend:'Ext.chart.Chart',
    width:400,
    height:400,
    theme:'Base:gradients',

    initComponent:function () {
        var _this = this;

        _this.store = _this.buildStore();
        _this.series = _this.buildSeries();

        _this.callParent(arguments);

    },

    buildStore:function () { // creamos el JsonStore de nuestra grafica de pie
        var store = Ext.create('Ext.data.JsonStore', {
            fields:['name', 'gender', 'age', 'cups'],
            data:[
                { 'name':'Michael', 'gender':'Male', 'age':12, 'cups':5 },
                { 'name':'Elisa', 'gender':'Female', 'age':20, 'cups':7 },
                { 'name':'Robert', 'gender':'Male', 'age':7, 'cups':3 },
                { 'name':'John', 'gender':'Male', 'age':54, 'cups':6 },
                { 'name':'Jessica', 'gender':'Female', 'age':22, 'cups':6 },
                { 'name':'Aaron', 'gender':'Male', 'age':3, 'cups':1 },
                { 'name':'Elizabeth', 'gender':'Female', 'age':42, 'cups':8 },
                { 'name':'Naomi', 'gender':'Female', 'age':33, 'cups':6 }
            ]
        });

        return store;
    },

    buildSeries:function () { // creamos las series de nuestra grafica
        var _this = this,
            series = [
                {
                    type:'pie',
                    angleField:'cups',
                    showInLegend:true,
                    tips:{
                        trackMouse:true,
                        width:140,
                        height:35,
                        renderer:function (storeItem, item) {
                            // calculate and display percentage on hover
                            var total = 0;
                            _this.store.each(function (rec) {
                                total += rec.get('cups');
                            });
                            this.setTitle(storeItem.get('name') +
                                ' drinks<br> ' + storeItem.get('cups') +
                                ' cups (' + Math.round(storeItem.get('cups') / total * 100) + '%)');
                        }
                    },
                    highlight:{
                        segment:{
                            margin:20
                        }
                    },
                    label:{
                        field:'name',
                        display:'rotate',
                        contrast:true,
                        font:'18px Arial'
                    }
                }
            ];

        return series;
    }

});