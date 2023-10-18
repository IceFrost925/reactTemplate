export default function SvgIcon({
  name,
  prefix = 'icon',
  color = 'currentColor',
  size = '1em',
  ...props
}: any) {
  const symbolId = `#${prefix}-${name}`

  return (
    <svg {...props} aria-hidden="true" className="svg-icon" width={size} height={size}>
      <use href={symbolId} fill={color} />
    </svg>
  )
}
