import request from '@/utils/request'

export function getList(sla01002) {
  return request({
    url: '/sla01/list',
    method: 'get',
    params:{
      sla01002:sla01002
    }
  })
}

export function getNotSaleHouse(){
  return request({
    url: '/sla01/getNotSaleHouse',
    method: 'get'
  })
}

export function getSla01007(){
  return request({
    url: '/sla01/getSla01007',
    method: 'get'
  })
}

export function getSla01008(){
  return request({
    url: '/sla01/getSla01008',
    method: 'get'
  })
}

export function getSla01015(){
  return request({
    url: '/sla01/getSla01015',
    method: 'get'
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
