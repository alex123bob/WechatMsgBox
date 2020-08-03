import MessagePlugin from './MessagePlugin'
import ImageMessage from '../message/Image'

export class ImageMessagePlugin extends MessagePlugin {
    constructor(){
        super()
    }

    messageType = 'Image'

    generateMsgEntity(msgId, content) {
        return new ImageMessage({
            content: content,
            id: msgId,
            createTime: new Date()
        })
    }

    render(msg, container) {
        super.render(msg, container)
        const imageBlob = msg.content
        let canvas = document.createElement("canvas")
        container.appendChild(canvas)
        container.appendChild(document.createElement('br'))
        let msgId = `Date.now()`
        canvas.setAttribute('msgId', msgId)
        canvas.setAttribute('msgType', 'Image')
        let ctx = canvas.getContext('2d')
        // Create an image to render the blob on the canvas
        let img = new Image()

        // Once the image loads, render the img on the canvas
        img.onload = function(){
            // Update dimensions of the canvas with the dimensions of the image
            canvas.width = this.width * 0.3
            canvas.height = this.height * 0.3

            // Draw the image
            ctx.drawImage(img, 0, 0, this.width * 0.3, this.height * 0.3)
        }

        // Crossbrowser support for URL
        let URLObj = window.URL || window.webkitURL

        // Creates a DOMString containing a URL representing the object given in the parameter
        // namely the original Blob
        img.src = URLObj.createObjectURL(imageBlob)

        return this.generateMsgEntity(imageBlob)
    }
}