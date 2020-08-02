import * as _ from 'lodash'

class MsgBoxInput {
    constructor() {
        
    }

    render() {
        const panelTpl = document.querySelector('#msgBoxInput').innerHTML
        const tplFunc = _.template(panelTpl)
        const tplHTML = tplFunc()

        document.body.innerHTML += tplHTML
    }
}

const Input = new MsgBoxInput()
export default Input