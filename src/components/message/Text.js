import Message from './Message'

export default class Text extends Message {
    constructor(obj) {
        super(obj)
    }

    type = 'Text'
}