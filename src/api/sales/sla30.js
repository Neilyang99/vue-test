import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sla30/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/sla30',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/sla30',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function getSla30005(){
  return request({
    url: '/sla30/getSla30005',
    method: 'get'
  })
}

export function getSla30084(){
  return request({
    url: '/sla30/getSla30084',
    method: 'get'
  })
}