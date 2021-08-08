import request from '@/utils/request'

// 应用列表查询
export function getList(data, type = 0) {
  return request({
    url: '/OP/OP03',
    method: 'post',
    data,
    type,
  })
}
