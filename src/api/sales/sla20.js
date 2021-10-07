import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sla20/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/sla20',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/sla20',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function selectList(params) {
  return request({
    url: '/sla00/selectList',
    method: 'get',
    params
  })
}

export function setOrderStatus(id,status) {
  return request({
    url: '/sla20/updateStatus',
    method: 'post',
    params: {
      id: id,
      status: status
    }
  })
}