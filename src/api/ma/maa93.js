import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/maa93/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/maa93',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/maa93',
    method: 'delete',
    params: {
      id: id
    }
  })
}
