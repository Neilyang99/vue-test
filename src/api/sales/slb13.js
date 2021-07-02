import request from '@/utils/request'

export function getList(slb13002) {
  return request({
    url: '/slb13/list',
    method: 'get',
    params:{
      slb13002:slb13002
    }
  })
}

export function save(params) {
  return request({
    url: '/slb13/add',
    method: 'post',
    params
  })
}

export function updateAmt(id, projectNo) {
  return request({
    url: '/slb13/updateAmt',
    method: 'post',
    params: {
      id: id,
      projectNo : projectNo
    }
  })
}

export function remove(id, houseId) {
  return request({
    url: '/slb13',
    method: 'delete',
    params: {
      id: id,
      houseId : houseId
    }
  })
}

export function getslb13004(projectNo){
  return request({
    url: '/slb13/getslb13004',
    method: 'get',
    params: {
      slb10004: projectNo
    }
  })
}
