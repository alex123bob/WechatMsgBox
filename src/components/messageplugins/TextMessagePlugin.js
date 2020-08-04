import MessagePlugin from './MessagePlugin'
import TextMessage from '../message/Text'
import * as _ from 'lodash'

export class TextMessagePlugin extends MessagePlugin {
    constructor(){
        super()
    }

    messageType = 'Text'

    extraCls = 'textMessage'

    sanitizeHTML(str) {
        let div = document.createElement('div')
        div.textContent = str
        return div.innerHTML
    }

    generateMsgEntity(msgId, content) {
        return new TextMessage({
            content: content,
            id: msgId,
            createTime: new Date()
        })
    }
    
    getTextMessageTpl() {
        const tplFunc = _.template(`
            <div class="<%= extraCls %>" msgId="<%= msgId %>" msgType="<%= msgType %>">
                <%= displayContent %>
            </div>
        `)
        return tplFunc
    }

    render(msg, container) {
        let msgId = Date.now()
        const tplFunc = this.getTextMessageTpl()
        let securedContent = this.sanitizeHTML(msg.content)
        const tplHTML = tplFunc({
            displayContent: securedContent,
            msgId: msgId,
            msgType: this.messageType,
            extraCls: this.extraCls
        })
        container.innerHTML += `<br />${tplHTML}`
        return this.generateMsgEntity(msgId, securedContent)
    }
}