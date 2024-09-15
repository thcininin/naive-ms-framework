import type { DialogApiInjection } from "naive-ui/es/dialog/src/DialogProvider";
import type { MessageApiInjection } from "naive-ui/es/message/src/MessageProvider";

interface Naiveui {
    message: MessageApiInjection,
    dialog: DialogApiInjection
}
// 定义对象， 用于承载useMessage
const naiveui: Naiveui = {
    //@ts-ignore
    message: {},
    //@ts-ignore
    dialog: {}
}

export default naiveui;
