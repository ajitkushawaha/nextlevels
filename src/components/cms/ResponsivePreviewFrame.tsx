'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Laptop, Smartphone } from 'lucide-react'

export type PreviewViewportMode = 'mobile' | 'laptop'

export const previewDevices = {
  mobile: {
    label: 'Mobile',
    width: 390,
    height: 760,
    icon: Smartphone,
  },
  laptop: {
    label: 'Laptop',
    width: 1280,
    height: 800,
    icon: Laptop,
  },
} satisfies Record<
  PreviewViewportMode,
  { label: string; width: number; height: number; icon: typeof Smartphone }
>

export default function ResponsivePreviewFrame({
  children,
  device,
}: {
  children: React.ReactNode
  device: PreviewViewportMode
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null)
  const previewDevice = previewDevices[device]

  useEffect(() => {
    const iframe = iframeRef.current
    const frameDocument = iframe?.contentDocument
    if (!frameDocument) return

    frameDocument.open()
    frameDocument.write(
      '<!doctype html><html><head><base target="_parent" /></head><body><div id="cms-preview-root"></div></body></html>'
    )
    frameDocument.close()

    document
      .querySelectorAll<HTMLLinkElement | HTMLStyleElement>(
        'link[rel="stylesheet"], style'
      )
      .forEach(node => {
        frameDocument.head.appendChild(node.cloneNode(true))
      })

    const baseStyles = frameDocument.createElement('style')
    baseStyles.textContent =
      'html,body,#cms-preview-root{margin:0;min-height:100%;background:#fff;} body{overflow-x:hidden;}'
    frameDocument.head.appendChild(baseStyles)

    setMountNode(frameDocument.getElementById('cms-preview-root'))
  }, [])

  return (
    <div className="w-full overflow-auto rounded-xl bg-slate-200 p-4">
      <div
        className="mx-auto overflow-hidden rounded-xl border border-slate-300 bg-white shadow-lg"
        style={{
          width: previewDevice.width,
          maxWidth: '100%',
        }}
      >
        <iframe
          ref={iframeRef}
          title={`${previewDevice.label} page preview`}
          className="block w-full bg-white"
          style={{
            height: previewDevice.height,
          }}
        />
        {mountNode ? createPortal(children, mountNode) : null}
      </div>
    </div>
  )
}
