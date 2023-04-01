import request from '@/utils/request'


export function getPaymentReport(params) {
  return request({
    url: '/maaReport/paymentReport',
    method: 'get',
    params
  })
}

export function getPaymentVendor(params) {
  return request({
    url: '/maaReport/paymentVendor',
    method: 'get',
    params
  })
}

export function getPaymentMonthly(params) {
  return request({
    url: '/maaReport/paymentMonthly',
    method: 'get',
    params
  })
}

export function getVendorList(params) {
  return request({
    url: '/maa93/selectList',
    method: 'get',
    params
  })
}