import {request} from "../axios/request";

const baseUrl = '/Tag'

const TagsApi = {}

TagsApi.All = () => {
  return request({
    url: `${baseUrl}/all`,
    method: 'get'
  })
}

TagsApi.loadTags = () => {
  return request({
    url: `${baseUrl}/loadTags`,
    method: 'get'
  })
}

TagsApi.addTag = tag => {
  return request({
    url: `${baseUrl}/addTag`,
    method: 'post',
    data: tag
  })
}

TagsApi.update = tag => {
  return request({
    url: `${baseUrl}/updateTag`,
    method: 'post',
    data: tag
  })
}

TagsApi.delete = id => {
  return request({
    url: `${baseUrl}/delete`,
    method: 'get',
    params: {
      id
    }
  })
}

export default TagsApi