import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/maa10/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/maa10',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/maa10',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function getMaterialItem() {
  return request({
    url: '/maa10/getMaterialItem',
    method: 'get'
  })
}

export function getStock(maa00ID) {
  return request({
    url: '/maa10/getStock',
    method: 'get',
    params:{
      maa00ID: maa00ID
    }
  })
}

