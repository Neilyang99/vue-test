import request from '@/utils/request'

export function selectList(params) {
  return request({
    url: '/sla00/selectList',
    method: 'get',
    params
  })
}


