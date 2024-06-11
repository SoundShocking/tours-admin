import { FC } from 'react'

import { NatureLocation } from '@/components/tour/NatureLocation'
import { Button, Card, ConfigProvider, Flex, Form } from 'antd'

export const TourNatureLocations: FC = () => {
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
      <Card title={'Nature Locations'}>
        <Form.List name={'nature_locations'}>
          {(fields, { add, remove }) => (
            <Flex gap={'large'} vertical>
              <Flex gap={'small'} vertical>
                {fields.map(field => (
                  <NatureLocation field={field} key={field.key} remove={remove} />
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
