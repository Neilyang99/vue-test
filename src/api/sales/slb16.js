import request from '@/utils/request'

export function getList(slb16002) {
  return request({
    url: '/slb16/list',
    method: 'get',
    params:{
      slb16002:slb16002
    }
  })
}

export function save(params) {
  return request({
    url: '/slb16/add',
    method: 'post',
    params
  })
}

export function updateAmt(id, projectNo) {
  return request({
    url: '/slb16/updateAmt',
    method: 'post',
    params: {
      id: id,
      projectNo : projectNo
    }
  })
}

export function remove(id, houseId) {
  return request({
    url: '/slb16',
    method: 'delete',
    params: {
      id: id,
      houseId : houseId
    }
  })
}

export function getslb16004(projectNo){
  return request({
    url: '/slb16/getslb16004',
    method: 'get',
    params: {
      slb10004: projectNo
    }
  })
}
