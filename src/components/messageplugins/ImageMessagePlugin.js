import MessagePlugin from './MessagePlugin'
import ImageMessage from '../message/Image'

export class ImageMessagePlugin extends MessagePlugin {
    constructor(){
        super()
    }

    messageType = 'Image'

    /**
     * Image render scale, scale down 33% by default.
     */
    imageScale = 0.3

    generateMsgEntity(msgId, content) {
        return new ImageMessage({
            content: content,
            id: msgId,
            createTime: new Date()
        })
    }

    render(msg, container) {
        const self = this
        super.render(msg, container)
        const imageBlob = msg.content
        let canvas = document.createElement("canvas")
        container.appendChild(canvas)
        container.appendChild(document.createElement('br'))
        let msgId = Date.now()
        canvas.setAttribute('msgId', msgId)
        canvas.setAttribute('msgType', 'Image')
        let ctx = canvas.getContext('2d')
        // Create an image to render the blob on the canvas
        let img = new Image()

        // Once the image loads, render the img on the canvas
        img.onload = function(){
            const w = this.width * self.imageScale
            const h = this.height * self.imageScale
            // Update dimensions of the canvas with the dimensions of the image
            canvas.width = w
            canvas.height = h

            // Draw the image
            ctx.drawImage(img, 0, 0, w, h)
            const data = ctx.getImageData(0, 0, w, h)
            ctx.putImageData(data, 0, 0)
        }

        // Crossbrowser support for URL
        let URLObj = window.URL || window.webkitURL

        // Creates a DOMString containing a URL representing the object given in the parameter
        // namely the original Blob
        img.src = URLObj.createObjectURL(imageBlob)

        return this.generateMsgEntity(msgId, imageBlob)
    }
}