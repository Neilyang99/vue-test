import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sla01/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/sla01',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/sla01',
    method: 'delete',
    params: {
      id: id
    }
  })
}
