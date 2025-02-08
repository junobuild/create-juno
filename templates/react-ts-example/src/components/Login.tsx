import { FC } from 'react'
import { signIn } from '@junobuild/core'
import { Button } from './Button'

export const Login: FC = () => {
  return <Button onClick={signIn}>Sign in</Button>
}
