/**
 * Created by ad on 2015/12/30.
 */
Ext.require(['extjsapp.componentTree',
    'extjsapp.dropForm',
    'extjsapp.propertyGrid',
    'extjsapp.fieldStore',
    'extjsapp.menuTopBar'])
Ext.application({
    name: 'Extjs表单设计器',
    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{
                title: 'Extjs表单设计器',
                xtype: 'panel',
                tbar: Ext.create('extjsapp.menuTopBar', {
                    dropFormID: 'dropform'
                }),
                border: false,
                layout: {
                    type: 'border',
                    padding: 1
                },
                items: [
                    {
                        xtype: 'extjsapp.componentTree',
                        title: '组件集',
                        split: true,
                        autoScroll: true,
                        region: 'west',
                        width: 200,
                        layout: 'fit',
                        collapsible: true
                    },
                    {
                        region: 'center',
                        id: 'dropform',
                        xtype: 'extjsapp.dropForm',
                        title: '表单',
                        propertyGridID: 'fieldProperty',
                        fieldStoreID: 'fieldStore',
                        collapsible: false,
                        bodyStyle: {
                            paddingTop: 20,
                        },
                        layout: {
                            type: 'column'
                        }
                    },
                    {
                        title: '属性',
                        split: true,
                        autoScroll: true,
                        region: 'east',
                        width: 300,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        collapsible: true,
                        items: [{
                            xtype: 'extjsapp.propertyGrid',
                            id: 'fieldProperty',
                            dropFormID: 'dropform',
                            fieldStoreID: 'fieldStore',
                            minHeight: 200
                        }, {
                            title: '数据源',
                            id: 'fieldStore',
                            dropFormID: 'dropform',
                            propertyGridID: 'fieldProperty',
                            xtype: 'extjsapp.fieldStore'
                        }]
                    }]
            }]
        })
    }
})
