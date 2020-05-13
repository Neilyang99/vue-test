import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/visitor/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/visitor',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/visitor',
    method: 'delete',
    params: {
      id: id
    }
  })
}
