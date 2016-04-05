function DDworkflow(p) {
    this.workflowInstance = p
}

DDworkflow.prototype.next = function(p, callback) {
    var i = this.workflowInstance
    var wj = this.workflowInstance.workflowJson
    i.currentStepID = p.nextID
    i.currentStepName = wj[p.nextID].process_name
    i.next = wj[p.nextID].next

    return i
}

DDworkflow.prototype.getInstance = function() {
    var i = this.workflowInstance
    var wj = this.workflowInstance.workflowJson
    i.currentStepName = i.currentStepName || wj['1'].process_name
    i.currentStepID = i.currentStepID || '1'
    i.next = wj[i.currentStepID].next

    return i
}