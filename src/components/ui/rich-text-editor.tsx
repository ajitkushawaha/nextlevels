'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { Table } from '@tiptap/extension-table'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableRow } from '@tiptap/extension-table-row'
import { Button } from '@/components/ui/button'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Table as TableIcon,
  Trash2,
  Columns,
  Rows,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Merge,
  Split,
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
}

type MenuButtonProps = {
  onClick: () => void
  isActive?: boolean
  children: React.ReactNode
  title: string
}

function MenuButton({ onClick, isActive, children, title }: MenuButtonProps) {
  return (
    <Button
      type="button"
      variant={isActive ? 'default' : 'outline'}
      size="sm"
      onClick={onClick}
      title={title}
      className={`h-8 w-8 p-0 ${isActive ? 'bg-[#081638] text-[#d7a23a] hover:bg-[#081638]' : 'bg-white hover:bg-slate-100'}`}
    >
      {children}
    </Button>
  )
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
  className = '',
}: RichTextEditorProps) {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkRel, setLinkRel] = useState<'nofollow' | 'dofollow'>('dofollow')
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.extend({
        renderHTML({ HTMLAttributes }) {
          return [
            'a',
            {
              ...HTMLAttributes,
              title: HTMLAttributes.href || HTMLAttributes.title || '',
              class: 'text-blue-600 underline cursor-pointer',
            },
            0,
          ]
        },
      }).configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'ProseMirror max-w-none focus:outline-none min-h-[300px] p-5 text-sm leading-7 text-slate-700 [&_p]:my-3 [&_h1]:mt-6 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-[#081638] [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#081638] [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#081638] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-7 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-7 [&_li]:my-1.5 [&_li]:pl-1 [&_li_p]:my-1 [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-[#d7a23a] [&_blockquote]:bg-amber-50 [&_blockquote]:py-3 [&_blockquote]:pl-4 [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-slate-200 [&_td]:p-2 [&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-50 [&_th]:p-2',
      },
    },
    immediatelyRender: false,
  })

  // Sync editor content when content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) {
    return (
      <div className={`border border-gray-200 rounded-lg ${className}`}>
        <div className="p-4 min-h-[300px] flex items-center justify-center">
          <div className="text-gray-500">Loading editor...</div>
        </div>
      </div>
    )
  }

  const addLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .setLink({
          href: linkUrl,
          rel: linkRel === 'nofollow' ? 'nofollow' : null,
        })
        .run()
      setLinkUrl('')
      setLinkRel('dofollow')
      setIsLinkModalOpen(false)
    }
  }

  const removeLink = () => {
    editor.chain().focus().unsetLink().run()
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
      setIsImageModalOpen(false)
    }
  }

  return (
    <div
      className={`rich-text-editor max-h-[calc(100vh-150px)] overflow-y-auto border border-gray-200 rounded-lg ${className}`}
    >
      {/* Toolbar */}
      <div className="sticky top-0 z-30 rounded-t-lg border-b border-gray-200 bg-white/95 p-2.5 shadow-md backdrop-blur flex flex-wrap gap-1">
        {/* Table Operations */}
        <div className="flex gap-1 border-r border-gray-200 pr-2 mr-2">
          <MenuButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
            isActive={false}
            title="Insert Table"
          >
            <TableIcon className="h-4 w-4" />
          </MenuButton>

          {editor.isActive('table') && (
            <>
              <MenuButton
                onClick={() => editor.chain().focus().deleteTable().run()}
                isActive={false}
                title="Delete Table"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().addColumnBefore().run()}
                isActive={false}
                title="Add Column Before"
              >
                <ArrowLeft className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                isActive={false}
                title="Add Column After"
              >
                <ArrowRight className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().deleteColumn().run()}
                isActive={false}
                title="Delete Column"
              >
                <Columns className="h-4 w-4 text-red-500" />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().addRowBefore().run()}
                isActive={false}
                title="Add Row Before"
              >
                <ArrowUp className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().addRowAfter().run()}
                isActive={false}
                title="Add Row After"
              >
                <ArrowDown className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().deleteRow().run()}
                isActive={false}
                title="Delete Row"
              >
                <Rows className="h-4 w-4 text-red-500" />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().mergeCells().run()}
                isActive={false}
                title="Merge Cells"
              >
                <Merge className="h-4 w-4" />
              </MenuButton>
              <MenuButton
                onClick={() => editor.chain().focus().splitCell().run()}
                isActive={false}
                title="Split Cell"
              >
                <Split className="h-4 w-4" />
              </MenuButton>
            </>
          )}
        </div>

        {/* Text Formatting */}
        <div className="flex gap-1 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            title="Code"
          >
            <Code className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Headings */}
        <div className="flex gap-1 mr-2">
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Lists */}
        <div className="flex gap-1 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
            title="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Special Elements */}
        <div className="flex gap-1 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Links and Images */}
        <div className="flex gap-1 mr-2">
          <MenuButton
            onClick={() => {
              // Check if there's an existing link and pre-fill the URL and Rel
              const existingLink = editor.getAttributes('link')
              if (existingLink.href) {
                setLinkUrl(existingLink.href)
                setLinkRel(
                  existingLink.rel === 'nofollow' ? 'nofollow' : 'dofollow'
                )
              } else {
                setLinkUrl('')
                setLinkRel('dofollow')
              }
              setIsLinkModalOpen(true)
            }}
            isActive={editor.isActive('link')}
            title="Add/Edit Link"
          >
            <LinkIcon className="h-4 w-4" />
          </MenuButton>
          <MenuButton onClick={removeLink} isActive={false} title="Remove Link">
            <Unlink className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => setIsImageModalOpen(true)}
            isActive={false}
            title="Add Image"
          >
            <ImageIcon className="h-4 w-4" />
          </MenuButton>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            isActive={false}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            isActive={false}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </MenuButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              {editor.isActive('link') ? 'Edit Link' : 'Add Link'}
            </h3>
            <input
              type="url"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              placeholder="Enter URL..."
              className="w-full p-2 border border-gray-300 rounded mb-4 text-sm"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addLink()
                }
              }}
              autoFocus
            />
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Link Attribute
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="linkRel"
                    value="dofollow"
                    checked={linkRel === 'dofollow'}
                    onChange={() => setLinkRel('dofollow')}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">dofollow</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="linkRel"
                    value="nofollow"
                    checked={linkRel === 'nofollow'}
                    onChange={() => setLinkRel('nofollow')}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">nofollow</span>
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addLink} size="sm" disabled={!linkUrl.trim()}>
                {editor.isActive('link') ? 'Update Link' : 'Add Link'}
              </Button>
              <Button
                onClick={() => {
                  setIsLinkModalOpen(false)
                  setLinkUrl('')
                }}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add Image</h3>
            <input
              type="url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="Enter image URL..."
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex gap-2">
              <Button onClick={addImage} size="sm">
                Add Image
              </Button>
              <Button
                onClick={() => setIsImageModalOpen(false)}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
