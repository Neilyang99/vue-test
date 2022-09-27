import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/maa01a/list',
    method: 'get',
    params
  })
}

export function getListByProject(projectId) {
  return request({
    url: '/maa01a/listByProject',
    method: 'get',
    params:{
      projectId: projectId
    }
  })
}

export function save(params) {
  return request({
    url: '/maa01a',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/maa01a',
    method: 'delete',
    params: {
      id: id
    }
  })
}

