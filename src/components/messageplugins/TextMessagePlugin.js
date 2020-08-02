import MessagePlugin from './MessagePlugin'
import TextMessage from '../message/Text'

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
    

    processMessage(txt) {
        return new TextMessage ({
            content: this.sanitizeHTML(txt),
            id: Date.now(),
            createTime: new Date()
        })
    }
}