import request from '@/utils/request'

export function getList(sla24002) {
  return request({
    url: '/sla24/list',
    method: 'get',
    params: {
      sla24002:sla24002
    }
  })
}

export function getSla24004(){
  return request({
    url: '/sla24/getSla24004',
    method: 'get'
  })
}

export function getSla24006(){
  return request({
    url: '/sla24/getSla24006',
    method: 'get'
  })
}

export function getOrderById(id){
  return request({
    url: '/sla20/getOrderById',
    method: 'get',
    params: {
      id:id
    }
  })
}

export function save(params) {
  return request({
    url: '/sla24',
    method: 'post',
    params
  })
}

export function confirm(params) {
  return request({
    url: '/sla24/updateFinishDate',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/sla24',
    method: 'delete',
    params: {
      id: id
    }
  })
}
