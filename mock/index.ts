import table from './table.js'
import user from './user.js'

/**
 *
 * mock请求对象参数
 {
    url: string;
    method?: MethodType;
    timeout?: number;
    statusCode?: number;
    response?: ((this: RespThisType, opt: {
        url: Recordable;
        body: Recordable;
        query: Recordable;
        headers: Recordable;
    }) => any) | any;
    rawResponse?: (this: RespThisType, req: IncomingMessage, res: ServerResponse) => void;
  }
 */

const mocks = [...user, ...table]
console.log(mocks)
export default mocks // 定义数据格式
