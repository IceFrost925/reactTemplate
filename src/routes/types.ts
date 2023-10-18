import { ComponentType, FC } from 'react'
import { NonIndexRouteObject } from 'react-router-dom'

interface Routes extends NonIndexRouteObject {
  title?: string
  path: string
  name?: string
  Component?: ComponentType | FC
  icon?: string
  children?: Routes[]
  hidden?: boolean
  auth?: boolean
}

export type { Routes }
