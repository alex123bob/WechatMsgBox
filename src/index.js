import MsgBox from 'components/ui/MsgBox'
import MsgBoxInput from 'components/ui/MsgBoxInput'
import 'main.scss'

import MessagePlugins from './components/messageplugins/index'
import Message from './components/message/Message'
import MessagePlugin from './components/messageplugins/MessagePlugin'


const main = async () => {
    MsgBox.render()
    MsgBoxInput.render()
    console.log(MessagePlugins)
    MsgBox.launch({
        adapters: MessagePlugins
    })
}

main().then(() => console.log('Started'))