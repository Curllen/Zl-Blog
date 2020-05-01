import {request} from "../axios/request";

const baseUrl = '/BlogInfo'

const BlogInfoApi = {}

BlogInfoApi.loadInfo = () => {
  return request({
    url: `${baseUrl}/getBlogInfo`,
    method: 'get'
  })
}

BlogInfoApi.updateInfo = info => {
  return request({
    url: `${baseUrl}/updateInfo`,
    method: 'post',
    data: info
  })
}

export default BlogInfoApi
