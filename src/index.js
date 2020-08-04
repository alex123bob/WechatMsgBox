import MsgBox from './components/ui/MsgBox'
import MsgBoxInput from './components/ui/MsgBoxInput'
import 'main.scss'

import MessagePlugins from './components/messageplugins/index'


const main = async () => {
    MsgBox.render()
    MsgBoxInput.render()
    MsgBox.launch({
        adapters: MessagePlugins
    })
    MsgBoxInput.launch(MsgBox.receiveMsg.bind(MsgBox))
}

main().then(() => {
    // we can put some logics here after page's rendered
    console.log('Started')
})