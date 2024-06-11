import { FC } from 'react'

import { Button, ConfigProvider, Flex, Form, Input } from 'antd'
import { FaTrash } from 'react-icons/fa6'

import styles from './TourCodes.module.scss'

export const TourCodes: FC = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 0,
          },
        },
      }}
    >
      <Form.Item label={'Codes'}>
        <Form.List name={'codes'}>
          {(fields, { add, remove }) => (
            <Flex gap={'large'} vertical>
              <Flex gap={'small'} vertical>
                {fields.map(field => (
                  <div className={styles.code} key={field.key}>
                    <Form.Item
                      name={field.name}
                      rules={[
                        {
                          message: 'Please enter code',
                          required: true,
                        },
                      ]}
                      validateTrigger={['onChange', 'onBlur']}
                    >
                      <Input placeholder={'Code'} />
                    </Form.Item>

                    <Button
                      danger
                      onClick={() => remove(field.name)}
                      shape={'circle'}
                      type={'primary'}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                ))}
              </Flex>

              <Flex justify={'flex-end'}>
                <Button onClick={() => add()} type={'primary'}>
                  Add code
                </Button>
              </Flex>
            </Flex>
          )}
        </Form.List>
      </Form.Item>
    </ConfigProvider>
  )
}
