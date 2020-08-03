export default class Message {
    /**
     * Init message entity.
     * @param {[content: string]: string, [id: string]: string, [createTime: string]: Date} msgObj Init message object
     */
    constructor(msgObj) {
        const {content, createTime, id, displayContent} = msgObj
        this.content = content
        this.createTime = createTime
        this.id = id
        this.displayContent = displayContent
    }

    /**
     * @desc Message Type, Text, Image, SystemMsg, Audio, Video. 'Text' by default.
     */
    type = 'Text'

    /**
     * @desc Message Content
     */
    content = null

    /**
     * @desc Whether message is recallable or not. True by default.
     */
    recallable = true

    /**
     * Unique message id
     */
    id = null

    /**
     * Time that message been created.
     */
    createTime = null

    /**
     * Time message been updated.
     */
    updateTime = null

}