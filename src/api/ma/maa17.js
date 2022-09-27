import request from '@/utils/request'


export function getList(pk, type) {
  return request({
    url: '/maa17/list',
    method: 'get',
    params:{
      dataPK: pk,
      type: type
    }
  })
}

export function save(params) {
  return request({
    url: '/maa17',
    method: 'post',
    params
  })
}

export function remove(id,maa16PK) {
  return request({
    url: '/maa17',
    method: 'delete',
    params: {
      id: id,
      maa16PK:maa16PK
    }
  })
}

export function getMaa17006(){
  return request({
    url: '/maa17/getMaa17006',
    method: 'get'
  })
}
