import Mock, { Random } from 'mockjs'
import { responseBody } from './utils.js'

export default [
  {
    url: '/account/list',
    method: 'get',
    statusCode: 200,
    response: (req) => {
      const { pageNum, pageSize } = req.query
      const data = Mock.mock({
        'list|30': [
          {
            id: '@id',
            realName: '@cname',
            mobile: /^1[0-9]{10}$/,
            idCardValue: '@id',
            schoolName: '@county',
            createTime: Random.date('yyyy-MM-dd HH:mm:ss'),
            enrollmentTime: Random.date('yyyy-MM-dd HH:mm:ss'),
            major: Random.integer(1, 4),
            authenticationNo: Random.integer(0, 1)
          }
        ]
      })
      let temp = JSON.parse(JSON.stringify(data.list))
      temp.splice((pageNum - 1) * pageSize, pageSize)
      return responseBody({
        data: { records: temp, total: data.list.length }
      })
    }
  }
]
