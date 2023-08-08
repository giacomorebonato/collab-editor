import { ComponentProps } from 'react'
import { Link as DaisyLink } from 'react-daisyui'
import { usePageContext } from './use-page-context.js'

export function AppLink(props: ComponentProps<typeof DaisyLink>) {
  props.href
  const pageContext = usePageContext()
  const className = [
    props.className,
    pageContext.urlPathname === props.href && 'is-active',
  ]
    .filter(Boolean)
    .join(' ')

  return <DaisyLink {...props} className={className} />
}
