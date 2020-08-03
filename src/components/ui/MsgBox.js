import * as _ from 'lodash'

class MsgBoxPanel {

    /**
     * Message entity queue.
     * Currently, we put all message entities in this array.
     * Down the road, we could reduce the pressure by moving all legacy message entities into database,
     * we solely display'em when user proactively retieve message history.
     */
    _msgQueue = []

    msgAdapters = {}

    constructor() {
        
    }

    render() {
        const panelTpl = document.querySelector('#msgBoxPanel').innerHTML
        const tplFunc = _.template(panelTpl)
        const tplHTML = tplFunc()

        document.body.innerHTML += tplHTML
    }

    launch(initObj) {
        const {adapters} = initObj
        if (adapters) {
            this.registerMessageAdapters(adapters)
        }
    }

    receiveMsg(msg) {
        let container = document.querySelector('.messageBoxPanel')
        this._msgQueue.push(
            this.msgAdapters[msg.MessageType].render(msg, container)
        )
        console.log(this._msgQueue)
    }

    removeMessageAdapter(adapter) {
        this.msgAdapters = {
            ...this.msgAdapters,
            ...adapter.Unmount()
        }
    }

    /**
     * Register adapter in inital phase.
     * @param {Array} msgAdapters adapter collection
     */
    registerMessageAdapters(msgAdapters) {
        this.msgAdapters = msgAdapters.reduce((prev, adapter) => {
            return {
                ...prev,
                ...adapter.Mount()
            }
        }, {})
    }
}

const MsgBox = new MsgBoxPanel()
export default MsgBox