/**
 * Created by ad on 2015/12/30.
 */
Ext.define("extjsapp.componentTree", {
    xtype: 'extjsapp.componentTree',
    config: {
        store: Ext.create('Ext.data.TreeStore', {
            root: {
                //expanded: true,
                children: [
                    {text: "文本框", leaf: true, xtype: 'textfield'},
                    {text: "文本域", leaf: true, xtype: 'textareafield'},
                    {text: "下拉菜单", leaf: true, xtype: 'combo'},
                    {text: "日期", leaf: true, xtype: 'datefield'},
                    {text: "时间", leaf: true, xtype: 'timefield'},
                    {text: "数字", leaf: true, xtype: 'numberfield'}
                    //{text: "fieldset", leaf: true, xtype: 'fieldset'}
                ]
            }
        }),
        rootVisible: false,
        viewConfig: {
            plugins: [{
                ddGroup: 'organizerDD',
                ptype: 'treeviewdragdrop',
                enableDrop: false,
                displayField: 'text'
            }]
        }
    },
    constructor: function (cf) {
        return Ext.create('Ext.tree.Panel', Object.assign({}, this.config, cf));
        //this.initConfig(config);
    }
})
;
