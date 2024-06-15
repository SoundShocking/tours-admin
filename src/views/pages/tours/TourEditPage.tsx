import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  ContentLanguageSwitcher,
  MediaGallery,
  MediaSingleFile,
  TourCodes,
  TourItinerary,
  TourLocations,
  TourNatureLocations,
} from '@/components'
import { SEO } from '@/components/SEO'
import { useGroups, useLocationsCountries, useTour } from '@/hooks'
import { useOperators } from '@/hooks/operators'
import { routes } from '@/routes'
import { IMediaFile } from '@/types'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  Switch,
  Tabs,
  type TabsProps,
} from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

dayjs.extend(customParseFormat)

export const TourEditPage: FC = () => {
  useDocumentTitle('Edit Tour')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.tours.index}>Tours</Link>,
    },
    {
      title: 'Edit Tour',
    },
  ]

  const [form] = Form.useForm()

  const [gallery, setGallery] = useState<IMediaFile[]>([])
  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [banner, setBanner] = useState<IMediaFile | null>(null)
  const [brochure, setBrochure] = useState<IMediaFile | null>(null)
  const { id } = useParams<{ id: string }>()
  const { isFetching, tour } = useTour(id!)

  const { countries, isFetching: isCountriesFetching } = useLocationsCountries(
    1,
    'all',
    '',
    'name',
    'asc'
  )
  const { groups, isFetching: isGroupsFetching } = useGroups(1, 'all', '', 'name', 'asc')
  const { isFetching: isOperatorsFetching, operators } = useOperators(1, 'all', '', 'name', 'asc')

  const relevanceOptions = useMemo(() => {
    if (countries) {
      return [
        { label: 'All', value: 'all' },
        ...countries.data.map(country => ({
          label: country.name,
          value: country.country_code,
        })),
      ]
    }
  }, [countries])

  const typesOptions = useMemo(() => {
    return (groups?.data || []).map(group => ({
      label: group.group_name,
      options: group.types.map(type => ({
        label: type.type_name,
        value: type.id,
      })),
      title: group.group_name,
    }))
  }, [groups])

  const formInitialValues = {
    codes: [],
    description: '',
    discount: false,
    end_point: null,
    hot: false,
    itinerary: [],
    key_words: '',
    locations: [],
    low_price: false,
    max_group_size: null,
    name: '',
    nature_locations: [],
    operator: null,
    slug: '',
    start_point: null,
    title: '',
    tour_length_days: null,
    types: [],
  }

  const items: TabsProps['items'] = [
    {
      children: (
        <div>
          <Form.Item label={'Name'} name={'name'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label={'Slug'} name={'slug'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={'Tour Length Days'}
                  name={'tour_length_days'}
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label={'Max Group Size'}
                  name={'max_group_size'}
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label={'Stickers'} style={{ marginBottom: 0 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label={'Hot'} name={'hot'}>
                  <Switch title={'Hot'} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label={'Discount'} name={'discount'}>
                  <Switch title={'Discount'} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label={'Low Price'} name={'low_price'}>
                  <Switch title={'Low Price'} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <TourCodes />

          <Form.Item label={'Relevance'} name={'relevance'} rules={[{ required: true }]}>
            <Select
              disabled={isCountriesFetching}
              loading={isCountriesFetching}
              mode={'multiple'}
              options={relevanceOptions}
              placeholder={'Choose Relevance'}
            />
          </Form.Item>

          <Form.Item label={'Types'} name={'types'} rules={[{ required: true }]}>
            <Select
              disabled={isGroupsFetching}
              filterOption={(input, option) =>
                (option?.label.toLocaleLowerCase() ?? '').includes(input.toLowerCase())
              }
              loading={isGroupsFetching}
              mode={'multiple'}
              options={typesOptions}
              placeholder={'Choose Types'}
              showSearch
            />
          </Form.Item>

          <Form.Item label={'Operator'} name={'operator'} rules={[{ required: true }]}>
            <Select
              disabled={isOperatorsFetching}
              filterOption={(input, option) =>
                (option?.label.toLocaleLowerCase() ?? '').includes(input.toLowerCase())
              }
              loading={isOperatorsFetching}
              options={(operators?.data || []).map(operator => ({
                label: operator.name,
                value: operator.id,
              }))}
              placeholder={'Choose Operator'}
              showSearch
            />
          </Form.Item>
        </div>
      ),
      key: 'Basic',
      label: 'Basic',
    },
    {
      children: (
        <Flex gap={'large'} vertical>
          <TourLocations />

          <TourNatureLocations />
        </Flex>
      ),
      key: 'locations',
      label: 'Locations',
    },
    {
      children: <TourItinerary />,
      key: 'itinerary',
      label: 'Itinerary',
    },
    {
      children: <MediaGallery files={gallery} setFiles={setGallery} />,
      key: 'gallery',
      label: 'Gallery',
    },
    {
      children: <SEO seoPreview={seoPreview} setSeoPreview={setSeoPreview} />,
      key: 'seo',
      label: 'SEO',
    },
  ]

  useEffect(() => {
    if (tour) {
      const startPoint = tour.tour_points.find(point => point.key === 'start_point')
      const endPoint = tour.tour_points.find(point => point.key === 'end_point')

      form.setFieldsValue({
        codes: tour.codes,
        description: tour.seo?.description || '',
        discount: Boolean(tour.discount),
        hot: Boolean(tour.hot),
        itinerary: tour.itinerary.map(item => ({
          description: item.description,
          duration: item.duration,
          order: item.order,
          title: item.title.join(': '),
        })),
        key_words: tour.seo?.key_words || '',
        locations: (tour.locations || []).map(location => ({
          cityId: location.id,
          countryId: location.country_id,
        })),
        low_price: Boolean(tour.low_price),
        max_group_size: tour.max_group_size,
        name: tour.tour_name,
        nature_locations: (tour.nature_locations || []).map(location => ({
          countryId: location.parent?.id || null,
          regionId: location.id,
        })),
        operator: tour.operator?.id || null,
        relevance: tour.relevance || [],
        slug: tour.slug,
        title: tour.seo?.title || '',
        tour_length_days: tour.tour_length_days,
        types: (tour.tour_types || []).map(type => type.id),
      })

      if (startPoint) {
        form.setFieldValue('start_point', {
          address: startPoint.address || '',
          name: startPoint.name || '',
          time: startPoint.time ? dayjs(startPoint.time, 'HH:mm') : null,
        })
      }

      if (endPoint) {
        form.setFieldValue('end_point', {
          address: endPoint.address || '',
          name: endPoint.name || '',
          time: endPoint.time ? dayjs(endPoint.time, 'HH:mm') : null,
        })
      }

      setGallery(tour.gallery || [])
      setBanner(tour.banner)
      setBrochure(tour.brochure)
      setSeoPreview(tour.seo?.media || null)
    }
  }, [tour, form])

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <Flex gap={'large'} vertical>
      <Flex align={'center'} justify={'space-between'}>
        <Breadcrumb items={breadcrumbs} />

        <ContentLanguageSwitcher />
      </Flex>

      <Form form={form} initialValues={formInitialValues} layout={'vertical'} onFinish={onFinish}>
        <Spin spinning={isFetching}>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <Card>
                <Tabs items={items} type={'card'} />
              </Card>
            </Col>

            <Col span={6}>
              <Flex gap={'middle'} vertical>
                <Card>
                  <Button
                    htmlType={'submit'}
                    icon={<FaFloppyDisk />}
                    loading={false}
                    type={'primary'}
                  >
                    Save
                  </Button>
                </Card>

                <Card title={'Banner'}>
                  <MediaSingleFile file={banner} setFile={setBanner} />
                </Card>

                <Card title={'Brochure'}>
                  <MediaSingleFile file={brochure} setFile={setBrochure} />
                </Card>
              </Flex>
            </Col>
          </Row>
        </Spin>
      </Form>
    </Flex>
  )
}
