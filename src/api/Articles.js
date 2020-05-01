import {request} from "../axios/request";

const baseUrl = '/Article'

const ArticleApi = {}

// 获取所有文章
ArticleApi.getArticles = () => {
  return request({
    url: `${baseUrl}/all`,
    method: 'get'
  })
}

// 分页文章信息
ArticleApi.page = page => {
  return request({
    url: `${baseUrl}/page/${page}`,
    method: 'get'
  })
}

// 通过指定参数获取文章
ArticleApi.query = params => {
  return request({
    url: `${baseUrl}/query`,
    params: params,
    method: 'get'
  })
}

// 获取最新top篇文章
ArticleApi.listLatest = top => {
  return request({
    url: `${baseUrl}/latest`,
    params: {
      top: top
    },
    method: 'get'
  })
}

// 通过指定文章Id获取相应文章
ArticleApi.get = id => {
  return request({
    url: `${baseUrl}/getArticleById`,
    method: 'get',
    params: {
      id
    }
  })
}

// 更新文章访问人数
ArticleApi.visit = articleId => {
  return request({
    url: `${baseUrl}/${articleId}`,
    method: 'put'
  })
}

// 获取文章数量
ArticleApi.count = () => {
  return request({
    url: `${baseUrl}/count`,
    method: 'get'
  })
}

// 新建文章
ArticleApi.create = article => {
  return request({
    url: `${baseUrl}/addArticle`,
    method: 'post',
    data: article
  })
}

// 通过文章Id更新指定文章信息
ArticleApi.update = (articleId, articleToUpdate) => {
  return request({
    url: `${baseUrl}/${articleId}`,
    method: 'put',
    data: articleToUpdate,
  })
}

// 更新文章状态
ArticleApi.updateStatus = (articleId, status) => {
  return request({
    url: `${baseUrl}/${articleId}/status/${status}`,
    method: 'put'
  })
}

// 更新草稿箱
ArticleApi.updateDraft = (articleId, content) => {
  return request({
    url: `${baseUrl}/${articleId}/status/draft/content`,
    method: 'put',
    data: {
      content: content
    }
  })
}

// 删除文章
ArticleApi.delete = id => {
  return request({
    url: `${baseUrl}/delete`,
    method: 'get',
    params: {
      id: id
    }
  })
}

// 文章状态
ArticleApi.articleStatus = {
  PUBLISHED: {
    value: 'PUBLISHED',
    color: 'green',
    status: 'success',
    text: '已发布'
  },
  DRAFT: {
    value: 'DRAFT',
    color: 'yellow',
    status: 'warning',
    text: '草稿'
  },
  RECYCLE: {
    value: 'RECYCLE',
    color: 'red',
    status: 'error',
    text: '回收站'
  }
}

export default ArticleApi