import { forwardRef } from 'react'
import { Modal } from 'react-daisyui'

export const LoginModal = forwardRef<HTMLDialogElement>(
  function LoginModalComponent(_props, ref) {
    return (
      <Modal ref={ref} backdrop>
        <Modal.Header className='font-bold'>Login with:</Modal.Header>
        <Modal.Body className='grid grid-cols-1 gap-2'>
          <a className='btn' href='/auth/login/google'>
            Google
          </a>
        </Modal.Body>
      </Modal>
    )
  },
)
