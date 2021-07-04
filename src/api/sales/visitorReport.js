import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sla00/list',
    method: 'get',
    params
  })
}