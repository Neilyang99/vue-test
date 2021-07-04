import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/visitor/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/visitor',
    method: 'post',
    params
  })
}

export function remove(id) {
  return request({
    url: '/visitor',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function getSla10004(){
  return request({
    url: '/visitor/getSla10004',
    method: 'get'
  })
}
export function getSla10016(){
  return request({
    url: '/visitor/getSla10016',
    method: 'get'
  })
}
export function getSla10017(){
  return request({
    url: '/visitor/getSla10017',
    method: 'get'
  })
}
export function getSla10018(){
  return request({
    url: '/visitor/getSla10018',
    method: 'get'
  })
}
export function getSla10019(){
  return request({
    url: '/visitor/getSla10019',
    method: 'get'
  })
}
export function getSla10020(){
  return request({
    url: '/visitor/getSla10020',
    method: 'get'
  })
}
export function getSla10021(){
  return request({
    url: '/visitor/getSla10021',
    method: 'get'
  })
}
export function getSla10022(){
  return request({
    url: '/visitor/getSla10022',
    method: 'get'
  })
}
export function getSla10023(){
  return request({
    url: '/visitor/getSla10023',
    method: 'get'
  })
}
export function getSla10024(){
  return request({
    url: '/visitor/getSla10024',
    method: 'get'
  })
}
export function getSla10025(){
  return request({
    url: '/visitor/getSla10025',
    method: 'get'
  })
}
export function getSla10026(){
  return request({
    url: '/visitor/getSla10026',
    method: 'get'
  })
}
export function getSla10027(){
  return request({
    url: '/visitor/getSla10027',
    method: 'get'
  })
}

export function getSla10029(){
  return request({
    url: '/visitor/getSla10029',
    method: 'get'
  })
}
export function getSla10030(){
  return request({
    url: '/visitor/getSla10030',
    method: 'get'
  })
}
