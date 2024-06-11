import { FC } from 'react'

import { TourLocation } from '@/components/tour/TourLocation'
import { Button, Card, ConfigProvider, Flex, Form } from 'antd'

export const TourLocations: FC = () => {
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
      <Card title={'Locations'}>
        <Form.List name={'locations'}>
          {(fields, { add, remove }) => (
            <Flex gap={'large'} vertical>
              <Flex gap={'small'} vertical>
                {fields.map(field => (
                  <TourLocation field={field} key={field.key} remove={remove} />
                ))}
              </Flex>

              <Flex justify={'flex-end'}>
                <Button onClick={add} type={'primary'}>
                  Add location
                </Button>
              </Flex>
            </Flex>
          )}
        </Form.List>
      </Card>
    </ConfigProvider>
  )
}
