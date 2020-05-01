import {request} from "../axios/request";

const baseUrl = '/Category'

const CategoryApi = {}

CategoryApi.All = () => {
  return request({
    url: `${baseUrl}/all`,
    method: 'get'
  })
}

CategoryApi.loadCategories = () => {
  return request({
    url: `${baseUrl}/loadCategories`,
    method: 'get'
  })
}

CategoryApi.addCate = cate => {
  return request({
    url: `${baseUrl}/addCate`,
    method: 'post',
    data: cate
  })
}

CategoryApi.updateCate = cate => {
  return request({
    url: `${baseUrl}/updateCate`,
    method: 'post',
    data: cate
  })
}

CategoryApi.delete = id => {
  return request({
    url: `${baseUrl}/delete`,
    method: 'get',
    params: {
      id
    }
  })
}

export default CategoryApi