import React, { useState } from 'react'
import { DynamicRoute } from '@/routes/Pages'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { useAppSelector } from '@/hooks/redux.ts'
import { Routes } from '@/routes/types.ts'

const { Header, Sider, Content } = Layout

const DefaultLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const userInfo = useAppSelector('userInfo')
  const menus = getMenus(userInfo.authMenu)
  console.log(menus)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menus} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}>
          <DynamicRoute></DynamicRoute>
        </Content>
      </Layout>
    </Layout>
  )
}
const getMenus = (routes: Routes[]) => {
  // todo 元素匹配
  return routes.map((item: any) => {
    if (item?.children) {
      item.children = getMenus(item.children)
    }
    return {
      key: item.name,
      icon: item.icon,
      label: item.title
    }
  })
}
export default DefaultLayout
