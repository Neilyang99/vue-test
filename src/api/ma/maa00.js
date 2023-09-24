import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/maa00/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/maa00',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/maa00',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function inertByNewProject(projectId) {
  return request({
    url: '/maa01a/inertByNewProject',
    method: 'get',
    params:{
      projectId: projectId
    }
  })
}