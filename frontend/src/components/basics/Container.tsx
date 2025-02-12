import { ReactNode } from 'react'

function Container({children, className} : {children : ReactNode, className?: string}) {
  return (
    <div className={'container border border-black rounded-md p-10 shadow-sm ' + className}>
        {children}
    </div>
  )
}

export default Container
