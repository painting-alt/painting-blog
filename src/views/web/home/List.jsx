import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { calcCommentsCount } from '@/utils'
import './index.css'

// components
import { Divider, Tooltip } from 'antd'
import SvgIcon from '@/components/SvgIcon'
import ArticleTag from '@/components/ArticleTag'

const ArticleList = props => {
  const history = useHistory()
  const { list } = props

  function jumpTo(id) {
    history.push(`/article/${id}`)
  }
  list.map(item => {
    console.log(item)
    return
  })
  return (
    <ul className='app-home-list'>
      {list.map(item => (
        item.isAlert ? (
          <li key={item.id} className='app-home-list-item app-home-list-isalert'>
            <Divider orientation='left'>
              <span className='title' onClick={() => jumpTo(item.id)}>
                {item.title}
              </span>
              <span className='posted-time'>{item.createdAt.slice(0, 10)}</span>
            </Divider>
            <Tooltip title={`小主，距离记录已经有${item.calcDay}过去了，快来复习吧！`} color='red' placement='top'>
              <div
                onClick={() => jumpTo(item.id)}
                className='article-detail content'
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </Tooltip>

            <div className='list-item-others'>
              <SvgIcon type='iconcomment' />
              <span style={{ marginRight: 5 }}> {calcCommentsCount(item.comments)}</span>

              <SvgIcon type='iconview' style={{ marginRight: 5 }} />
              <span>{item.viewCount}</span>

              <ArticleTag tagList={item.tags} categoryList={item.categories} />
            </div>
          </li>
        ) : (
          <li key={item.id} className='app-home-list-item'>
            <Divider orientation='left'>
              <span className='title' onClick={() => jumpTo(item.id)}>
                {item.title}
              </span>
              <span className='posted-time'>{item.createdAt.slice(0, 10)}</span>
            </Divider>

            <div
              onClick={() => jumpTo(item.id)}
              className='article-detail content'
              dangerouslySetInnerHTML={{ __html: item.content }}
            />

            <div className='list-item-others'>
              <SvgIcon type='iconcomment' />
              <span style={{ marginRight: 5 }}> {calcCommentsCount(item.comments)}</span>

              <SvgIcon type='iconview' style={{ marginRight: 5 }} />
              <span>{item.viewCount}</span>

              <ArticleTag tagList={item.tags} categoryList={item.categories} />
            </div>
          </li>
        )
      ))}
    </ul>
  )
}

export default ArticleList
