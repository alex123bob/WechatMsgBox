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

    launch() {
        const inputField = document.querySelector('.msginput')
        const textArea = inputField.querySelector('textarea')
        const enterKeyPressedStream = fromEvent(textArea, 'keyup').pipe(filter(e => e.keyCode === 13))
        const textEnterStream = fromEvent(textArea, 'keyup').pipe(map(e => e.target.value))
        enterKeyPressedStream.subscribe(val => {
            textArea.value = ''
            textArea.focus()
        })
        textEnterStream.subscribe(val => {
            console.log('text', val)
        })
    }
}

const Input = new MsgBoxInput()
export default Input