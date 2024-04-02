import { Dispatch, FC, SetStateAction } from 'react'
import ReactQuill from 'react-quill'

import { MediaSingleFile } from '@/components'
import { ContentBuilderBlock, IContentBuilderType, IMediaFile } from '@/types'
import { Button, Card, Dropdown, Flex, type MenuProps } from 'antd'
import { FaTrash } from 'react-icons/fa6'

interface Props {
  content: IContentBuilderType
  setContent: Dispatch<SetStateAction<IContentBuilderType>>
}

const contentBlocksNames = {
  [ContentBuilderBlock.FAQ]: 'FAQ',
  [ContentBuilderBlock.IMAGE]: 'Image',
  [ContentBuilderBlock.WYSIWYG]: 'Text Editor',
}

export const ContentBuilder: FC<Props> = ({ content, setContent }) => {
  const onWYSIWYGAdd = () => {
    setContent(prev => [...prev, { content: { wysiwyg: '' }, type: ContentBuilderBlock.WYSIWYG }])
  }

  const onImageAdd = () => {
    setContent(prev => [...prev, { content: { image: null }, type: ContentBuilderBlock.IMAGE }])
  }

  const items: MenuProps['items'] = [
    {
      key: 'Text Editor',
      label: <>Text Editor</>,
      onClick: onWYSIWYGAdd,
    },
    {
      key: 'Image',
      label: <>Image</>,
      onClick: onImageAdd,
    },
    {
      key: 'FAQ',
      label: <>FAQ</>,
    },
  ]

  const updateImage = (idx: number, image: IMediaFile | null) => {
    const updatedBlocks = [...content]

    updatedBlocks[idx] = {
      content: {
        image,
      },
      type: ContentBuilderBlock.IMAGE,
    }
    setContent(updatedBlocks)
  }

  const updateWYSIWYG = (idx: number, text: string) => {
    const updateBlocks = [...content]

    updateBlocks[idx] = {
      content: {
        wysiwyg: text,
      },
      type: ContentBuilderBlock.WYSIWYG,
    }
    setContent(updateBlocks)
  }

  const onDeleteBlock = (idx: number) => {
    const updateBlocks = content.filter((_, index) => index !== idx)

    setContent(updateBlocks)
  }

  return (
    <div>
      <Flex gap={'large'} vertical>
        {content.map((block, idx) => (
          <Card
            extra={
              <Button danger onClick={() => onDeleteBlock(idx)} shape={'circle'} type={'primary'}>
                <Flex align={'center'} justify={'center'}>
                  <FaTrash />
                </Flex>
              </Button>
            }
            key={`${block.type}_${idx}`}
            title={contentBlocksNames[block.type]}
          >
            {block.type === ContentBuilderBlock.IMAGE && (
              <MediaSingleFile
                file={block.content.image}
                setFile={file => {
                  updateImage(idx, file)
                }}
              />
            )}

            {block.type === ContentBuilderBlock.WYSIWYG && (
              <ReactQuill
                onChange={text => {
                  updateWYSIWYG(idx, text)
                }}
                theme={'snow'}
                value={block.content.wysiwyg}
              />
            )}
          </Card>
        ))}
      </Flex>

      <Flex justify={'end'}>
        <Dropdown menu={{ items }}>
          <Button type={'primary'}>Add Block</Button>
        </Dropdown>
      </Flex>
    </div>
  )
}
