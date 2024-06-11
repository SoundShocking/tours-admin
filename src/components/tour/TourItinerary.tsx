import { FC } from 'react'

import { Button, Card, Col, Flex, Form, Input, InputNumber, Row, TimePicker } from 'antd'
import { FaTrash } from 'react-icons/fa6'

export const TourItinerary: FC = () => {
  return (
    <>
      <Flex gap={'large'} vertical>
        <Card title={'Start Point'}>
          <Form.Item label={'Name'} name={['start_point', 'name']}>
            <Input></Input>
          </Form.Item>

          <Form.Item label={'Address'} name={['start_point', 'address']}>
            <Input></Input>
          </Form.Item>

          <Form.Item label={'Time'} name={['start_point', 'time']}>
            <TimePicker format={'HH:mm'} />
          </Form.Item>
        </Card>

        <Card title={'End Point'}>
          <Form.Item label={'Name'} name={['end_point', 'name']}>
            <Input></Input>
          </Form.Item>

          <Form.Item label={'Address'} name={['end_point', 'address']}>
            <Input></Input>
          </Form.Item>

          <Form.Item label={'Time'} name={['end_point', 'time']}>
            <TimePicker format={'HH:mm'} />
          </Form.Item>
        </Card>

        <Card title={'Itinerary'}>
          <Form.List name={'itinerary'}>
            {(fields, { add, remove }) => (
              <Flex gap={'large'} vertical>
                <Flex gap={'middle'} vertical>
                  {fields.map(field => (
                    <Card
                      extra={
                        <Button
                          danger
                          onClick={() => remove(field.name)}
                          shape={'circle'}
                          type={'primary'}
                        >
                          <FaTrash />
                        </Button>
                      }
                      key={field.key}
                      title={'Itinerary'}
                      type={'inner'}
                    >
                      <Form.Item label={'Title'} name={[field.name, 'title']}>
                        <Input />
                      </Form.Item>

                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item label={'Duration'} name={[field.name, 'duration']}>
                            <InputNumber min={1} />
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item label={'Order'} name={[field.name, 'order']}>
                            <InputNumber />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Flex>

                <Flex justify={'flex-end'}>
                  <Button onClick={add} type={'primary'}>
                    Add itinerary
                  </Button>
                </Flex>
              </Flex>
            )}
          </Form.List>
        </Card>
      </Flex>
    </>
  )
}
