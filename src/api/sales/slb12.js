import request from '@/utils/request'

export function getList(slb12002) {
  return request({
    url: '/slb12/list',
    method: 'get',
    params:{
      slb12002:slb12002
    }
  })
}

export function save(params) {
  return request({
    url: '/slb12/add',
    method: 'post',
    params
  })
}

export function updateCount(id) {
  return request({
    url: '/slb12/updateCount',
    method: 'post',
    params: {
      id: id
    }
  })
}

export function remove(id, houseId) {
  return request({
    url: '/slb12',
    method: 'delete',
    params: {
      id: id,
      houseId : houseId
    }
  })
}

export function getSlb12004(projectNo){
  return request({
    url: '/slb12/getSlb12004',
    method: 'get',
    params: {
      slb10004: projectNo
    }
  })
}
