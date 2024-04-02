import { FC } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import logo from '@/assets/images/logo.png'
import { useAuthorize } from '@/hooks/useAuthorize'
import { useMe } from '@/hooks/useMe'
import { Button, Flex, Form, Image, Input } from 'antd'

import styles from './LoginPage.module.scss'

export const LoginPage: FC = () => {
  const { isSuccess } = useMe()
  const { authorizeMutate, isPending } = useAuthorize()
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    authorizeMutate(values, {
      onSuccess: () => {
        navigate('/')
      },
    })
  }

  if (isSuccess) {
    return <Navigate replace to={'/'} />
  }

  return (
    <Flex align={'center'} className={styles.wrapper} justify={'center'}>
      <Form className={styles.form} layout={'vertical'} onFinish={onFinish}>
        <div className={styles.logo}>
          <Image preview={false} src={logo} />
        </div>

        <Form.Item label={'Email'} name={'email'} rules={[{ required: true }]}>
          <Input type={'email'} />
        </Form.Item>

        <Form.Item label={'Password'} name={'password'} rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>

        <Button htmlType={'submit'} loading={isPending} type={'primary'}>
          Login
        </Button>
      </Form>
    </Flex>
  )
}
