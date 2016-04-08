/**
 * Created by ad on 2016/1/15.
 */
Ext.define("extjsapp.menuTopBar", {
    xtype: 'extjsapp.menuTopBar',
    exportForm() {
        showFormJson = this.showFormJson
        showFormJson.dropFormID = this.dropFormID
        var fieldMap = Ext.getCmp(this.dropFormID).extraData.fieldMap
        var code = JSON.stringify([...fieldMap])
        Ext.tip.QuickTipManager.init()
        Ext.create('Ext.window.Window', {
            title: 'FormItems',
            //autoScroll: true,
            height: 600,
            width: 800,
            layout: 'fit',
            html: '<iframe onload="showFormJson(this)" frameborder="0" src="FormCodeShow.html" width=100% height=100%/>'
        }).show()
    },
    showFormJson(e) {
        var form = Ext.getCmp(showFormJson.dropFormID)
        var fieldMap = form.extraData.fieldMap
        var formJson = []
        for (var item of form.items.items) {
            formJson.push(fieldMap.get(item.id))
        }
        console.log(formJson)
        var codetext = JSON.stringify(formJson, null, '\t')
        var CodeMirror = e.contentWindow.CodeMirror
        console.log(CodeMirror)
        console.log(e.contentWindow.document.body)
        var myCodeMirror = CodeMirror(e.contentWindow.document.body, {
            value: codetext,
            lineNumbers: true,
            readOnly: true,
            mode: "application/ld+json"
        })
    },
    getJson() {
        var form = Ext.getCmp(this.dropFormID)
        var fieldMap = form.extraData.fieldMap
        var formJson = []
        for (var item of form.items.items) {
            formJson.push(fieldMap.get(item.id))
        }
        return formJson
    },
    saveForm(name) {
        var form = Ext.getCmp(this.dropFormID)
        var id = form.extraData.id
        form.extraData.formName = name
        var data = {
            "formName": name,
            "data": this.getJson()
        }
        if (id) {
            data._id = id
        }
        Ext.Ajax.request({
            //async: false,
            url: '../api/formManagement',
            params: {
                data: JSON.stringify(data),
                action: 'save'
            },
            method: 'POST',
            success: function(response, opts) {
                var resJson = Ext.decode(response.responseText)
                var data = Ext.decode(response.responseText)
                //alert(JSON.stringify(data))
                if (data.err) {
                    Ext.Msg.alert(data.err.name, data.err.message)
                    return
                }
                console.log(data.result)
                form.extraData.id = data.result.retval._id
                Ext.Msg.alert("提示", "数据保存成功！");
            },
            failture: function(curForm, act) {
                Ext.Msg.alert("提示", "数据保存失败！");
            }
        });
    },
    constructor(cf) {
        var that = this
        Object.assign(this, cf)
        that.items = [
            {
                xtype: 'button',
                text: '保存',
                icon: "extjs/icon/page_save.png",
                handler() {
                    var form = Ext.getCmp(that.dropFormID)
                    var formName = form.extraData.formName || ''
                    Ext.MessageBox.prompt('表单名称', '请输入表单名称：',
                        (btn, text) => {
                            if (btn == 'ok') {
                                if (!text) {
                                    this.handler()
                                    return
                                }
                                that.saveForm(text)
                            }
                        },
                        this, false, formName)
                }
            }, '-',
            {
                xtype: 'button',
                text: '导出',
                icon: "extjs/icon/disk_download.png",
                handler: () => {
                    this.exportForm()
                }
            },
            {
                xtype: 'splitbutton',
                text: 'Menu Button',
                glyph: 61,
                menu: [{
                    text: 'Menu Button 1'
                }]
            }, '-'
        ]
        return that.items
    }
})