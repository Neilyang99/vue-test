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
