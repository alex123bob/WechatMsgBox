export default class MessagePlugin {
    constructor() {

    }

    /**
     * Message type, Text|Image|Audio|SystemMessage|Video, 'Text' by default
     */
    messageType = 'Text'

    /**
     * Process message entity, generate rendable content for message box.
     * @param {Object|String|Array} msg message entity
     */
    processMessage(msg) {
        // This functionality is suppsed to be implemented in child class
    }

    /**
     * Register message adapter into message box.
     */
    Mount() {
        return {
            [`${this.messageType}`]: this.processMessage
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