export const Spinner = ({
  className,
  ...otherProps
}: React.ComponentProps<'span'>) => {
  return (
    <span className={`loading loading-spinner ${className}`} {...otherProps} />
  )
}
