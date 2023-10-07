import { FC, ComponentType } from 'react'
import { NonIndexRouteObject } from 'react-router-dom'

type PathRouteCustomProps = {
  title?: string
  path: string
  Component: ComponentType | FC
  icon?: string
  children?: Routes[]
  auth?: boolean
}

type Routes = NonIndexRouteObject & PathRouteCustomProps

export type { Routes }
