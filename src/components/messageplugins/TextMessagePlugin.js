import MessagePlugin from './MessagePlugin'
import TextMessage from '../message/Text'
import * as _ from 'lodash'

export class TextMessagePlugin extends MessagePlugin {
    constructor(){
        super()
    }

    messageType = 'Text'

    sanitizeHTML(str) {
        let div = document.createElement('div')
        div.textContent = str
        return div.innerHTML
    }
    
    generateContent(msgId, content) {
        const displayContentTpl = document.querySelector('#textMessage').innerHTML
        const tplFunc = _.template(displayContentTpl)
        const tplHTML = tplFunc({
            displayContent: content,
            msgId: msgId
        })
        return tplHTML
    }

    processMessage(msg) {
        let securedContent = this.sanitizeHTML(msg.content)
        let msgId = Date.now()
        return new TextMessage ({
            content: securedContent,
            id: msgId,
            createTime: new Date(),
            displayContent: this.generateContent(msgId, securedContent)
        })
    }
}