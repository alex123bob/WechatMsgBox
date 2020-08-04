import Text from './Text'

export default class SystemText extends Text {
    constructor(obj) {
        super(obj)
    }

    type = 'SystemText'

    recallable = false
}