import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/maa14/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/maa14',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/maa14',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function getWorkerName() {
  return request({
    url: '/maa14/getWorkerName',
    method: 'get'
  })
}