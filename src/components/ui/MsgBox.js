import * as _ from 'lodash'

class MsgBoxPanel {

    /**
     * Message entity queue.
     * Currently, we put all message entities in this array.
     * Down the road, we could reduce the pressure by moving all legacy message entities into database,
     * we solely display'em when user proactively retieve message history.
     */
    _msgQueue = []

    _msgAdapters = {}

    constructor() {
        
    }

    _onDbClick() {
        const me = this
        let container = document.querySelector('.messageBoxPanel')
        container.addEventListener('dblclick', function(evt) {
            const msgEntity = evt.target
            const msgId = msgEntity.getAttribute('msgId')
            const msgType = msgEntity.getAttribute('msgType')
            if (msgId && msgType) {
                if (me._msgAdapters[msgType].recall(msgId, me._msgQueue)) {
                    me._msgAdapters['SystemText'].render({
                        content: 'One message has been recalled'
                    }, container)
                }
            }
        }, false)
    }

    optimizedRender() {
        // TODO
        // When the number of dom/message nodes is increased exponentially,
        // we shall optimize the rendition of message nodes within container.
        // So scrolling to load fixed amount of message nodes is a must.
    }

    render() {
        const tplFunc = _.template(`
            <div class="messageBoxPanel">
            </div>
        `)
        const tplHTML = tplFunc()

        document.body.innerHTML += tplHTML
    }

    launch(initObj) {
        const {adapters} = initObj
        if (adapters) {
            this.registerMessageAdapters(adapters)
        }
        this._onDbClick()
    }

    /**
     * This functionality is exposed to input field.
     * @param {Object} msg message instance
     */
    receiveMsg(msg) {
        let container = document.querySelector('.messageBoxPanel')
        this._msgQueue.push(
            this._msgAdapters[msg.MessageType].render(msg, container)
        )
        console.log(this._msgQueue)
    }

    /**
     * Remove message adapter by simply calling adapter's unmount functionality, to let itself detached from message box panel.
     * @param {Object} adapter message adapter
     */
    removeMessageAdapter(adapter) {
        this._msgAdapters = {
            ...this._msgAdapters,
            ...adapter.Unmount()
        }
    }

    /**
     * Register adapter in inital phase.
     * @param {Array} _msgAdapters adapter collection
     */
    registerMessageAdapters(_msgAdapters) {
        this._msgAdapters = _msgAdapters.reduce((prev, adapter) => {
            return {
                ...prev,
                ...adapter.Mount()
            }
        }, {})
    }
}

const MsgBox = new MsgBoxPanel()
export default MsgBox