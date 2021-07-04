import request from '@/utils/request'


export function getMediaAnalysis(projectCode) {
  return request({
    url: '/visitorReport/getMediaAnalysis',
    method: 'get',
    params: {
      projectCode: projectCode
    }
  })
}

export function getReportAnalysis(projectCode, type) {
  return request({
    url: '/visitorReport/getReportAnalysis',
    method: 'get',
    params: {
      projectCode: projectCode,
      type: type
    }
  })
}