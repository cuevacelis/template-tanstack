import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import HeaderNotAuth from './-components/header-not-auth'

export const Route = createFileRoute('/(not-auth)')({
  component: Layout,
})

function Layout() {
  return (
    <>
      <HeaderNotAuth />
      <Outlet />
    </>
  )
}
