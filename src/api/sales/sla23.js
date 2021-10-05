import request from '@/utils/request'

export function getList(sla23002) {
  return request({
    url: '/sla23/list',
    method: 'get',
    params: {
      sla23002:sla23002
    }
  })
}

export function getSla23006(){
  return request({
    url: '/sla23/getSla23006',
    method: 'get'
  })
}

export function getSla23031(){
  return request({
    url: '/sla23/getSla23031',
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
    url: '/sla23',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/sla23',
    method: 'delete',
    params: {
      id: id
    }
  })
}
