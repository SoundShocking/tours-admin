import { FC } from 'react'

import { MediaSingleFile } from '@/components/MediaSingleFile'
import { IMediaFile } from '@/types'
import { Form, Input } from 'antd'

interface Props {
  seoPreview: IMediaFile | null
  setSeoPreview: (file: IMediaFile | null) => void
}

export const SEO: FC<Props> = ({ seoPreview, setSeoPreview }) => {
  return (
    <>
      <Form.Item initialValue={''} label={'Title'} name={'title'}>
        <Input.TextArea allowClear autoSize />
      </Form.Item>

      <Form.Item initialValue={''} label={'Description'} name={'description'}>
        <Input.TextArea allowClear autoSize />
      </Form.Item>

      <Form.Item initialValue={''} label={'Keywords'} name={'key_words'}>
        <Input.TextArea allowClear autoSize />
      </Form.Item>

      <Form.Item label={'Preview Image'} style={{ marginBottom: 0 }}>
        <MediaSingleFile file={seoPreview} setFile={setSeoPreview} />
      </Form.Item>
    </>
  )
}
