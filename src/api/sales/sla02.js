import request from '@/utils/request'

export function getList(sla02002) {
  return request({
    url: '/sla02/list',
    method: 'get',
    params:{
      sla02002:sla02002
    }
  })
}

export function getSla02008(){
  return request({
    url: '/sla02/getSla02008',
    method: 'get'
  })
}

export function getSla02006(){
  return request({
    url: '/sla02/getSla02006',
    method: 'get'
  })
}

export function getSla02005(){
  return request({
    url: '/sla02/getSla02005',
    method: 'get'
  })
}

export function save(params) {
  return request({
    url: '/sla02',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/sla02',
    method: 'delete',
    params: {
      id: id
    }
  })
}
