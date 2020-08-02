import MessagePlugin from './MessagePlugin'

export class ImageMessagePlugin extends MessagePlugin {
    constructor(){
        super()
    }

    messageType = 'Image'

    processMessage(txt) {
        return txt
    }
}