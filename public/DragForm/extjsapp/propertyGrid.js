/**
 * Created by ad on 2016/1/7.
 */
Ext.define("extjsapp.propertyGrid", {
    xtype: 'extjsapp.propertyGrid',
    config: {
        xtype: 'propertygrid',
        border: 0,
        sortableColumns: false,
        listeners: {
            propertychange(source, recordId, value, oldValue, eOpts) {
                this.parent.replaceFormComponent()
            },
            beforecellclick(that, td, cellIndex, record, tr, rowIndex, e, eOpts){
                var s = new Set()
                s.add("xtype").add("id")
                if (s.has(record.data.name)) {
                    return false
                }
                return true
            }
        }
    },
    replaceFormComponent(){
        var fieldConfig = Object.assign({}, this.propertyGrid.getSource())
        var form = Ext.getCmp(this.propertyGrid.dropFormID)
        var index = form.items.items.findIndex(x => x.id == form.extraData.selectedItem.id)
        this.copyFieldStore(form.extraData.selectedItem, fieldConfig)
        form.remove(form.extraData.selectedItem)
        var item = form.insert(index, fieldConfig)
        form.extraData.setSelectedField(item)
    },
    copyFieldStore(oldItem, fieldConfig){
        switch (oldItem.xtype) {
            case 'combo':
            {
                var fieldStore = Ext.getCmp(this.propertyGrid.fieldStoreID)
                var data = fieldStore.parent.getData()
                fieldConfig.store = data || fieldConfig.store
            }
            default:
                break
        }
    },
    constructor: function (cf) {
        this.propertyGrid = Ext.create('Ext.grid.property.Grid', Object.assign({}, this.config, cf))
        this.propertyGrid.parent = this
        return this.propertyGrid
        //this.initConfig(config);
    }
});
