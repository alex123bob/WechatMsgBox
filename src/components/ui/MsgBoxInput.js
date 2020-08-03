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
        return {
            MessageType: 'Text',
            content: val
        }
    }

    /**
     * Launch input editor
     * @param {Function} getInputSource receive input source
     */
    launch(getInputSource) {
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

        mergedEnterStream.subscribe(onNext, onError, onComplete)
    }
}

const Input = new MsgBoxInput()
export default Input