import {TextMessagePlugin} from './TextMessagePlugin'
import * as _ from 'lodash'
import SystemText from '../message/SystemText'

export class SystemTextMessagePlugin extends TextMessagePlugin {
    constructor(){
        super()
    }

    messageType = 'SystemText'

    extraCls = 'systemTextMessage'

    generateMsgEntity(msgId, content) {
        return new SystemText({
            content: content,
            id: msgId,
            createTime: new Date()
        })
    }
}