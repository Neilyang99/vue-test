import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/maa94/list',
    method: 'get',
    params
  })
}

export function getItemList(params) {
  return request({
    url: '/maa94/itemList',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/maa94',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/maa94',
    method: 'delete',
    params: {
      id: id
    }
  })
}
