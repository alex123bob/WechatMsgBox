import Message from './Message'

export default class Image extends Message {
    constructor(obj) {
        super(obj)
    }

    type = 'Image'
}