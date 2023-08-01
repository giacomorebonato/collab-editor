import { ProfileForm } from '@features/auth/profile-form.jsx'
import { Root } from './__root.js'
import { AboutPage } from './about-page.js'
import { EditorPage } from './editor-page.js'

export const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <EditorPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/profile',
        element: <ProfileForm />,
      },
    ],
  },
]
