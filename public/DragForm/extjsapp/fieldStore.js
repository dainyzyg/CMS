/**
 * Created by ad on 2016/1/11.
 */
Ext.define("extjsapp.fieldStore", {
    xtype: 'extjsapp.fieldStore',
    config: {
        border: 0,
        hidden: true,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
        listeners: {
            edit(editor, e){
                e.record.commit()
                var propertyGrid = Ext.getCmp(this.propertyGridID)
                propertyGrid.parent.replaceFormComponent()
            }
        },
        tbar: [{
            text: '添加',
            icon: 'extjs/icon/add.png',
            handler(){
                var grid = this.up('grid')
                grid.getStore().insert(0, {value: '', default: false})
                grid.plugins[0].startEditByPosition({
                    row: 0,
                    column: 0
                });
            }
        }],
        columns: [{
            header: '选项值',
            align: 'center',
            dataIndex: 'value',
            flex: 1,
            editor: {
                //allowBlank: false
            }
        }]
    },
    getData(){
        if (!this.grid.isVisible()) {
            return null
        } else {
            var data = []
            this.grid.getStore().each((record)=> {
                data.push(record.data.value)
            })
            return data
        }
    },
    setData(item){
        if (item) {
            switch (item.xtype) {
                case 'combo':
                    var data = []
                    item.getStore().each((record)=> {
                        data.push({value: record.raw[0]})
                    })
                    this.grid.bindStore(Ext.create('Ext.data.Store', {
                        fields: ['value', 'default'],
                        data: data
                    }))
                    this.grid.setVisible(true)
                    break
                default:
                    this.grid.setVisible(false)
                    break
            }
        } else {
            this.grid.setVisible(false)
        }
    },
    constructor: function (cf) {
        this.grid = Ext.create('Ext.grid.Panel', Object.assign({}, this.config, cf))
        this.grid.parent = this
        return this.grid
    }
});