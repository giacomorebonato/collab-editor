import { TrpcClient } from '@client/trpc-client.js'
import { LoginModal } from '@features/auth/login-modal.jsx'
import { AppLink } from '@renderer/app-link.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AnimatePresence } from 'framer-motion'
import { ReactNode, useCallback, useEffect, useRef } from 'react'
import { Footer, Menu, Navbar } from 'react-daisyui'
import { FaHamburger } from 'react-icons/fa/index.js'
import { toast } from 'react-toastify'
import { registerSW } from 'virtual:pwa-register'

const SideMenu = ({
  modalRef,
}: {
  modalRef: React.RefObject<HTMLDialogElement>
}) => {
  const getProfile = TrpcClient.auth.getProfile.useQuery({
    from: 'session',
  })
  const logout = TrpcClient.auth.logout.useMutation({
    onSuccess() {
      getProfile.refetch()
    },
  })

  const handleShow = useCallback(() => {
    modalRef.current?.showModal()
  }, [modalRef])

  return (
    <Menu className='p-4 w-80 h-full bg-base-200 text-base-content'>
      <Menu.Item onClick={handleShow}>
        <span>Open Modal</span>
      </Menu.Item>

      {getProfile.isSuccess && (
        <>
          <Menu.Item>
            <AppLink href='/profile'>Profile</AppLink>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              logout.mutateAsync()
            }}
          >
            {logout.isLoading ? <span>Logging out</span> : <span>Logout</span>}
          </Menu.Item>
        </>
      )}
    </Menu>
  )
}

export const Root = ({ children }: { children: ReactNode }) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (import.meta.env.PROD) {
      const updateSW = registerSW({
        immediate: true,
        onOfflineReady() {
          toast('Offline ready')
        },
        onNeedRefresh() {
          if (confirm('New content available. Reload?')) {
            updateSW(true)
          }
        },
      })
    }
  }, [])

  return (
    <div className='drawer lg:drawer-open drawer-end'>
      <input id='drawer-toggle' type='checkbox' className='drawer-toggle' />

      <div className='drawer-content'>
        <Navbar>
          <Navbar.Start>
            <AppLink
              href='/'
              className='link text-2xl normal-case no-underline cursor-pointer'
            >
              collab-editor
            </AppLink>
          </Navbar.Start>
          <Navbar.End>
            <label
              htmlFor='drawer-toggle'
              className='p-4 cursor-pointer visible lg:hidden'
            >
              <FaHamburger size={30} />
            </label>
          </Navbar.End>
        </Navbar>
        <AnimatePresence mode='wait' initial={false}>
          <div className='h-screen p-2'>{children}</div>
        </AnimatePresence>
        <Footer className='pl-10 pr-10 pt-4 pb-10 bg-neutral text-neutral-content flex items-center justify-center'>
          <div>
            <Footer.Title>Links</Footer.Title>
            <AppLink href='/about' className='link link-hover'>
              about
            </AppLink>
          </div>
        </Footer>

        <LoginModal ref={modalRef} />
      </div>

      <div className='drawer-side !grid col-start-2'>
        <label htmlFor='drawer-toggle' className='sm:drawer-overlay' />
        <SideMenu modalRef={modalRef} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  )
}
