import request from '@/utils/request'

export function getVisitorList(visitorId) {
  return request({
    url: '/visitorLog/visitorList',
    method: 'get',
    params: {
      visitorId:visitorId
    }
  })
}

export function getSla11003(){
  return request({
    url: '/visitorLog/getSla11003',
    method: 'get'
  })
}

export function save(params) {
  return request({
    url: '/visitorLog',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/visitorLog',
    method: 'delete',
    params: {
      id: id
    }
  })
}


export function getNotSaleHouse(projectNo ){
  return request({
    url: '/sla01/getNotSaleHouse',
    method: 'get',
    params: {
      projectNo: projectNo
    }
  })
}