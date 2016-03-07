/**
 * Created by ad on 2016/1/6.
 */
Ext.define("extjsapp.dropForm", {
    xtype: 'extjsapp.dropForm',
    config: {
        //items:[{
        //    border:0,
        //    columnWidth: 1,
        //    html:'<hr>'
        //}],
        plugins: Ext.create('extjsapp.PanelFieldDragZone', {
            ddGroup: 'organizerDD'
        }),
        listeners: {
            afterrender(e, eOpts){
                var that = this
                Ext.select('body').on('click', function () {
                        that.extraData.setSelectedField(null)
                        var fieldStore = Ext.getCmp(this.fieldStoreID)
                        fieldStore.parent.setData(null)
                    },
                    that,
                    {
                        delegate: '#' + that.id
                    })
                Ext.select('#' + that.id).on('click',
                    function (e, t) {
                        var item = that.getChildByElement(t.id)
                        that.extraData.setSelectedField(item)
                    },
                    that,
                    {
                        delegate: '.x-field',
                        stopEvent: true
                    })
                that.extraData.createDropTarget(that)
            }
        }
    },
    extraData: {
        selectedItem: null,
        fieldMap: new Map(),
        actionDiv: null,
        createDropTarget(form){
            this.parent.createDropTarget(form)
        },
        setSelectedField(item){
            this.parent.setSelectedField(item)
        }
    },
    getFieldConfig(xtype) {
        switch (xtype) {
            case 'textfield':
                return {
                    xtype: 'textfield',
                    id: '',
                    fieldLabel: '文本框',
                    labelAlign: 'right',
                    columnWidth: 0.5,
                    allowBlank: true,
                    labelWidth: 113,
                    style: {
                        border: '1px dashed transparent'
                    },
                    margin: 3,
                    //valueC: ''
                }
            case 'textareafield':
                return {
                    xtype: 'textareafield',
                    id: '',
                    fieldLabel: '文本域',
                    labelAlign: 'right',
                    columnWidth: 1,
                    allowBlank: true,
                    labelWidth: 113,
                    style: {
                        border: '1px dashed transparent'
                    },
                    margin: 3
                }
            case 'combo':
                return {
                    xtype: 'combo',
                    id: '',
                    fieldLabel: '下拉菜单',
                    labelAlign: 'right',
                    columnWidth: 0.5,
                    allowBlank: true,
                    labelWidth: 113,
                    margin: 3,
                    //valueC: '下拉项1',
                    style: {
                        border: '1px dashed transparent'
                    },
                    //displayField: 'name',
                    //valueField: 'name',
                    store: ['下拉项1', '下拉项2']
                }
            case 'datefield':
                return {
                    xtype: 'datefield',
                    id: '',
                    fieldLabel: '日期',
                    labelAlign: 'right',
                    columnWidth: 0.5,
                    allowBlank: true,
                    labelWidth: 113,
                    margin: 3,
                    format: 'Y/m/d',
                    //valueC: '下拉项1',
                    style: {
                        border: '1px dashed transparent'
                    }
                }
            case 'timefield':
                return {
                    xtype: 'timefield',
                    id: '',
                    fieldLabel: '时间',
                    labelAlign: 'right',
                    columnWidth: 0.5,
                    allowBlank: true,
                    labelWidth: 113,
                    margin: 3,
                    //valueC: '下拉项1',
                    style: {
                        border: '1px dashed transparent'
                    }
                }
            case 'numberfield':
                return {
                    xtype: 'numberfield',
                    id: '',
                    fieldLabel: '数字',
                    labelAlign: 'right',
                    columnWidth: 0.5,
                    allowBlank: true,
                    editable: true,
                    labelWidth: 113,
                    margin: 3,
                    style: {
                        border: '1px dashed transparent'
                    }
                }
            case 'fieldset':
                return {
                    xtype: 'fieldset',
                    id: '',
                    title: 'fieldset',
                    minHeight: 300,
                    collapsible: true,
                    columnWidth: 1,
                    items: [{
                        xtype: 'numberfield',
                        id: '',
                        fieldLabel: '数字',
                        labelAlign: 'right',
                        columnWidth: 0.5,
                        allowBlank: true,
                        editable: true,
                        labelWidth: 113,
                        margin: 3,
                        style: {
                            border: '1px dashed transparent'
                        }
                    }],
                    margin: 3,
                    style: {
                        border: '1px dashed transparent'
                    }
                }
        }
    },
    createDropTarget(form){
        var that = this
        var formPanelDropTarget = new Ext.dd.DropTarget(form.body, {
            ddGroup: 'organizerDD',
            notifyEnter: function (ddSource, e, data) {
                //Add some flare to invite drop.
                //body.stopAnimation();
                //body.highlight();
                //console.log('notifyEnter', e.target)
                //Ext.getCmp('dropform').remove(data.field);
            },
            notifyOver: function (ddSource, e, data) {
                if (data.field) {
                    var dropItem = form.getChildByElement(e.target.id)
                    if (dropItem) {
                        var indexTo = form.items.items.findIndex(x => x.id == dropItem.id)
                        var indexFrom = form.items.items.findIndex(x => x.id == data.field.id)
                        form.move(indexFrom, indexTo)
                        that.setSelectedField(that.extraData.selectedItem)
                    }
                }
                else {
                    var xtype = data.records[0].raw.xtype || 'textfield'
                    var dropItem = form.getChildByElement(e.target.id)
                    var fieldConfig = that.getFieldConfig(xtype)
                    var itemNew
                    if (dropItem) {
                        var indexTo = form.items.items.findIndex(x => x.id == dropItem.id)
                        itemNew = form.insert(indexTo, fieldConfig)
                    } else {
                        itemNew = form.add(fieldConfig)
                    }
                    fieldConfig.id = itemNew.id
                    data.field = itemNew
                    that.extraData.fieldMap.set(itemNew.id, fieldConfig)
                    that.setSelectedField(itemNew)
                }
                return true
            },
            notifyDrop: function (ddSource, e, data) {
                return true
            }
        });
    },
    setSelectedField(item) {
        var pGrid = Ext.getCmp(this.form.propertyGridID)
        var fieldStore = Ext.getCmp(this.form.fieldStoreID)
        if (this.extraData.selectedItem && this.extraData.selectedItem.getEl()) {
            this.extraData.selectedItem.getEl().dom.style.borderColor = 'transparent'
        }
        if (item) {
            item.getEl().dom.style.borderColor = 'cornflowerblue'
            this.extraData.selectedItem = item
            pGrid.setSource(this.extraData.fieldMap.get(this.extraData.selectedItem.id))
            this.showActionDiv()
        } else {
            this.extraData.selectedItem = null
            pGrid.setSource({})
            this.hideActionDiv()
        }
        fieldStore.parent.setData(item)
    },
    hideActionDiv(){
        if (this.extraData.actionDiv) {
            this.extraData.actionDiv.style.display = 'none'
        }
    },
    showActionDiv(){
        var that = this
        var item = this.extraData.selectedItem
        var cr = item.getEl().dom.getBoundingClientRect()
        if (!this.extraData.actionDiv) {
            this.extraData.actionDiv = document.createElement('div')
            this.extraData.actionDiv.style.position = 'fixed'
            this.extraData.actionDiv.style.width = 45
            this.extraData.actionDiv.style.top = cr.top + 4
            this.extraData.actionDiv.style.left = cr.left + 5
            //this.extraData.actionDiv.onmouseover = ()=> {
            //    this.extraData.actionDiv.style.display = 'block'
            //}
            //editField.editDiv.onmouseout = ()=> {
            //    editField.editDiv.style.display = 'none'
            //}
            var editImg = document.createElement('img')
            editImg.src = "extjs/icon/application_form_edit.png"
            editImg.style.cursor = 'pointer'
            editImg.onclick = ()=> {
                that.setSelectedField(item)
            }
            var deleteImg = document.createElement('img')
            deleteImg.src = "extjs/icon/delete.png"
            deleteImg.style.cursor = 'pointer'
            deleteImg.style.paddingLeft = 8
            deleteImg.onclick = ()=> {
                var selectedItem = that.extraData.selectedItem
                that.extraData.fieldMap.delete(selectedItem.id)
                var pGrid = Ext.getCmp(that.form.propertyGridID)
                pGrid.setSource({})
                that.form.remove(selectedItem)
                that.hideActionDiv()
            }
            this.extraData.actionDiv.appendChild(editImg)
            this.extraData.actionDiv.appendChild(deleteImg)
            document.body.appendChild(this.extraData.actionDiv)
        } else {
            this.extraData.actionDiv.style.display = 'block'
            this.extraData.actionDiv.style.top = cr.top + 4
            this.extraData.actionDiv.style.left = cr.left + 5
        }
    },
    constructor: function (cf) {
        var that = this
        this.form = Ext.create('Ext.form.Panel', Object.assign({}, this.config, cf))
        this.extraData.parent = this
        this.form.extraData = this.extraData
        return this.form
    }
});