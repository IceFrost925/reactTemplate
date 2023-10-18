import React, { useEffect, useMemo, useState } from 'react'
import { DynamicRoute } from '@/routes/Pages'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { useAppSelector } from '@/hooks/redux.ts'
import { Routes } from '@/routes/types.ts'
import { cloneDeep } from 'lodash'
import SvgIcon from '@/components/SvgIcon'
import { useLocation, useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const DefaultLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const userInfo = useAppSelector('userInfo')
  // 菜单配置项
  const accordionStyle = false
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  // 组装菜单的数据格式
  const menus = getMenus(cloneDeep(userInfo.authMenu))
  const getRootSubmenuKeys = useMemo(() => {
    return menus.map((item) => item.path)
  }, [menus])

  useEffect(() => {
    initSelectKeys()
  }, [])
  // 根据路由初始化菜单
  const initSelectKeys = () => {
    const keys = RegExp(/^(\/\w+)(\/\w+)$/).exec(location.pathname) ?? []
    setSelectedKeys([location.pathname])
    setOpenKeys(keys)
  }
  // 菜单展开关闭回调
  const onOpenChange = (keys: string[]) => {
    if (accordionStyle) {
      const latestOpenKey = openKeys.pop()
      if (getRootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys)
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
      }
    } else {
      setOpenKeys(keys)
    }
  }
  // 跳转界面
  const goMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          items={menus}
          onClick={goMenu}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={onOpenChange}
        />
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
            minHeight: 'calc(100vh - 112px)',
            background: colorBgContainer
          }}>
          <DynamicRoute></DynamicRoute>
        </Content>
      </Layout>
    </Layout>
  )
}
const getMenus = (routes: Routes[]) => {
  return routes.reduce((menus: any[], item: any) => {
    if (item.hidden) {
      return menus
    }
    if (item?.children) {
      item.children = getMenus(item.children)
    }
    menus.push({
      key: item.path,
      icon: item?.icon && <SvgIcon name={item.icon} />,
      label: item.title,
      children: item?.children
    })
    return menus
  }, [])
}
export default DefaultLayout
