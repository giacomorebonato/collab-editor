import { useConstant } from '@features/hooks/use-constant.js'
import React, { ComponentType } from 'react'

export function ClientOnly(props: {
  fallback: JSX.Element
  component: () => Promise<{ default: ComponentType<any> }>
}) {
  const Component = useConstant(() => {
    return React.lazy(props.component)
  })

  return (
    <React.Suspense fallback={props.fallback}>
      <Component />
    </React.Suspense>
  )
}
