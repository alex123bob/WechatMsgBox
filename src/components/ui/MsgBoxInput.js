import * as _ from 'lodash'
import { fromEvent } from 'rxjs'
import { filter, map, takeUntil } from 'rxjs/operators'

class MsgBoxInput {
    constructor() {
        
    }

    render() {
        const panelTpl = document.querySelector('#msgBoxInput').innerHTML
        const tplFunc = _.template(panelTpl)
        const tplHTML = tplFunc()

        document.body.innerHTML += tplHTML
    }

    processInputSource(val) {
        if (val instanceof Blob) {
            return {
                MessageType: 'Image',
                content: val
            }
        }
        else if (val.fromSystem) {
            return {
                MessageType: 'SystemText',
                content: val.val
            }
        }
        else {
            return {
                MessageType: 'Text',
                content: val
            }
        }
    }

    _retrieveImageFromClipboardAsBlob(pasteEvent, callback) {
        if(pasteEvent.clipboardData == false){
            if(typeof(callback) == "function"){
                callback(undefined)
            }
        }
    
        let items = pasteEvent.clipboardData.items
    
        if(items == undefined){
            if(typeof(callback) == "function"){
                callback(undefined)
            }
        }
    
        for (let i = 0; i < items.length; i++) {
            // Skip content if not image
            if (items[i].type.indexOf("image") == -1) continue
            // Retrieve image on clipboard as blob
            let blob = items[i].getAsFile()
    
            if(typeof(callback) == "function"){
                callback(blob)
            }
        }
    }

    onPaste(getInputSource) {
        const inputField = document.querySelector('.msginput')
        const textArea = inputField.querySelector('textarea')
        let me = this

        textArea.addEventListener('paste', function(e) {
            e.preventDefault()
            me._retrieveImageFromClipboardAsBlob(e, function(imageBlob){
                // If there's an image, display it in the canvas
                if(imageBlob){
                    let processedInputSource = me.processInputSource(imageBlob)
                    getInputSource(processedInputSource)
                }
            })
        }, false)
    }

    /**
     * Launch input editor
     * @param {Function} getInputSource receive input source
     */
    launch(getInputSource) {
        const me = this
        const inputField = document.querySelector('.msginput')
        const textArea = inputField.querySelector('textarea')
        const enterKeyPressedStream = fromEvent(textArea, 'keyup').pipe(filter(e => e.keyCode === 13))
        const textEnterStream = fromEvent(textArea, 'keyup').pipe(map(e => e.target.value))
        const mergedEnterStream = textEnterStream.pipe(takeUntil(enterKeyPressedStream))

        const onNext = (val) => {
        }
        const onError = (err) => {

        }
        const onComplete = () => {
            let val = this.processInputSource(textArea.value)
            getInputSource(val)
            textArea.value = ''
            textArea.focus()
            mergedEnterStream.subscribe(onNext, onError, onComplete)
        }
        // Listen to regular keyboard typing event.
        mergedEnterStream.subscribe(onNext, onError, onComplete)

        // Listen to text area paste event
        this.onPaste(getInputSource)

        // Trigger system message
        document.querySelector('.systemMsgBtn').addEventListener('click', function() {
            getInputSource(me.processInputSource({
                fromSystem: true,
                val: 'Bob has left current chatting group'
            }))
        }, false)
    }
}

const Input = new MsgBoxInput()
export default Input