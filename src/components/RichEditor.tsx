// @ts-ignore
import ReactQuill, { Quill } from 'react-quill'

import 'react-quill/dist/quill.snow.css'

// @ts-ignore
export const RichTextEditor = ({ onChange, value }) => {
  // @ts-ignore
  const handleChange = (content: string, delta: Quill.Delta, source: string, editor: Quill) => {
    onChange(content)
  }

  return (
    <ReactQuill
      formats={[
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
      ]}
      modules={{
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link'],
          ['clean'],
        ],
      }}
      onChange={handleChange}
      value={value}
    />
  )
}
