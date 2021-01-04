import request from '@/utils/request'

export function selectList(params) {
  return request({
    url: '/sla00/selectList',
    method: 'get',
    params
  })
}

export function getList(params) {
  return request({
    url: '/sla00/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/sla00',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/sla00',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function startToSale(id,status) {
  return request({
    url: '/sla00/startToSale',
    method: 'get',
    params: {
      id: id,
      status: status
    }
  })
}