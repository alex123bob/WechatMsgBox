export default class MessagePlugin {
    constructor() {

    }

    /**
     * Time limit for recalling message
     */
    maximumTimeToRecall = 2 * 60 * 1000

    /**
     * Message type, Text|Image|Audio|SystemMessage|Video, 'Text' by default
     */
    messageType = 'Text'

    /**
     * Render message into container
     * @param {Object} msg {MessageType, content}
     * @param {HTMLElement} container 
     */
    render(msg, container) {
        // This functionality is suppsed to be implemented in child class
    }

    recall(msgId, msgQueue) {
        let index = -1
        let msgEntity = null
        msgQueue.forEach((msgObj, i) => {
            if (msgObj.id == msgId) {
                index = i
            }
        })
        if (index !== -1) {
            msgEntity = msgQueue[index]
        }
        // Message needs to be recallable
        if (msgEntity && msgEntity.recallable) {
            // If message that been sent for over 2 minutes, we can not recall it.
            if (new Date() - msgEntity.createTime > this.maximumTimeToRecall) {
                window.alert('We can not recall message sent 2 minutes ago')
                return false
            }
            else {
                // Remove message from MessageBox Dom Node.
                document.querySelector(`[msgId="${msgId}"]`).remove()
                msgQueue.splice(index, 1)
                return true
            }
        }
        else {
            return false
        }
    }

    /**
     * Register message adapter into message box.
     */
    Mount() {
        return {
            [`${this.messageType}`]: {
                render: this.render.bind(this),
                recall: this.recall.bind(this)
            }
        }
    }

    /**
     * Unmount message adapter from message box.
     */
    Unmount() {
        return {
            [`${this.messageType}`]: null
        }
    }
}