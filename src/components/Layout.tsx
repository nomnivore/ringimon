interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <p>this is in a layout</p>
      {children}
    </div>
  )
}
