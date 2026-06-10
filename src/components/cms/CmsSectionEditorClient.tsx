'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, RefreshCw, Save, Send } from 'lucide-react'
import PageRenderer from '@/components/cms/PageRenderer'
import ResponsivePreviewFrame, {
  previewDevices,
  type PreviewViewportMode,
} from '@/components/cms/ResponsivePreviewFrame'
import HomeDestinationsEditor from '@/components/cms/section-editors/HomeDestinationsEditor'
import HomeHeroEditor from '@/components/cms/section-editors/HomeHeroEditor'
import HomeJsonSectionEditor from '@/components/cms/section-editors/HomeJsonSectionEditor'
import HomeProgramEditor from '@/components/cms/section-editors/HomeProgramEditor'
import HomeWhyChooseUsEditor from '@/components/cms/section-editors/HomeWhyChooseUsEditor'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { defaultHomePageContent } from '@/lib/cms/homeDefaults'
import { getCmsPage, getCmsSection } from '@/lib/cms/sectionRegistry'
import type {
  CmsPageContent,
  CmsSection,
  HomeDestinationsSection,
  HomeHeroSection,
  HomeProgramSection,
  HomeWhyChooseUsSection,
} from '@/lib/cms/types'
import { toast } from 'sonner'

function getHero(content: CmsPageContent) {
  return content.sections.find(section => section.type === 'homeHero') as
    | HomeHeroSection
    | undefined
}

function getProgram(content: CmsPageContent) {
  return content.sections.find(section => section.type === 'homeProgram') as
    | HomeProgramSection
    | undefined
}

function getDestinations(content: CmsPageContent) {
  return content.sections.find(section => section.type === 'homeDestinations') as
    | HomeDestinationsSection
    | undefined
}

function getWhyChooseUs(content: CmsPageContent) {
  return content.sections.find(section => section.type === 'homeWhyChooseUs') as
    | HomeWhyChooseUsSection
    | undefined
}

function getSectionById(content: CmsPageContent, sectionId: string) {
  return content.sections.find(section => section.id === sectionId)
}

function updateHero(
  content: CmsPageContent,
  updater: (hero: HomeHeroSection) => HomeHeroSection
) {
  return {
    ...content,
    sections: content.sections.map(section => {
      if (section.type !== 'homeHero') return section
      return updater(section)
    }),
  }
}

function updateProgram(
  content: CmsPageContent,
  updater: (program: HomeProgramSection) => HomeProgramSection
) {
  return {
    ...content,
    sections: content.sections.map(section => {
      if (section.type !== 'homeProgram') return section
      return updater(section)
    }),
  }
}

function updateDestinations(
  content: CmsPageContent,
  updater: (destinations: HomeDestinationsSection) => HomeDestinationsSection
) {
  return {
    ...content,
    sections: content.sections.map(section => {
      if (section.type !== 'homeDestinations') return section
      return updater(section)
    }),
  }
}

function updateWhyChooseUs(
  content: CmsPageContent,
  updater: (whyChooseUs: HomeWhyChooseUsSection) => HomeWhyChooseUsSection
) {
  return {
    ...content,
    sections: content.sections.map(section => {
      if (section.type !== 'homeWhyChooseUs') return section
      return updater(section)
    }),
  }
}

function updateSectionById(
  content: CmsPageContent,
  sectionId: string,
  nextSection: CmsSection
) {
  return {
    ...content,
    sections: content.sections.map(section =>
      section.id === sectionId ? nextSection : section
    ),
  }
}

export default function CmsSectionEditorClient({
  pageKey,
  sectionId,
}: {
  pageKey: string
  sectionId: string
}) {
  const page = getCmsPage(pageKey)
  const section = getCmsSection(pageKey, sectionId)
  const [viewportMode, setViewportMode] = useState<PreviewViewportMode>('laptop')
  const [title, setTitle] = useState(page?.title || 'CMS Page')
  const [content, setContent] = useState<CmsPageContent>(defaultHomePageContent)
  const [isLoading, setIsLoading] = useState(section?.status === 'ready')
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  const hero = useMemo(() => getHero(content), [content])
  const program = useMemo(() => getProgram(content), [content])
  const destinations = useMemo(() => getDestinations(content), [content])
  const whyChooseUs = useMemo(() => getWhyChooseUs(content), [content])
  const activeCmsSection = useMemo(
    () => getSectionById(content, sectionId),
    [content, sectionId]
  )
  const isHomeHero = pageKey === 'home' && sectionId === 'home-hero'
  const isHomeProgram = pageKey === 'home' && sectionId === 'home-program'
  const isHomeDestinations =
    pageKey === 'home' && sectionId === 'home-destinations'
  const isHomeWhyChooseUs =
    pageKey === 'home' && sectionId === 'home-why-choose-us'
  const isEditableHomeSection =
    isHomeHero || isHomeProgram || isHomeDestinations || isHomeWhyChooseUs
  const isJsonHomeSection =
    pageKey === 'home' && section?.status === 'ready' && !isEditableHomeSection
  const isReadyHomeSection = isEditableHomeSection || isJsonHomeSection

  useEffect(() => {
    if (!isReadyHomeSection) return

    let isMounted = true

    async function loadPage() {
      try {
        const response = await fetch('/api/admin/cms/pages/home')
        if (!response.ok) throw new Error('Unable to load CMS draft')
        const data = await response.json()

        if (!isMounted) return

        setTitle(data.page.title || 'Home Page')
        setContent(data.page.draftContent || defaultHomePageContent)
      } catch (error) {
        console.error(error)
        toast.error('Loaded default home content. Could not fetch saved draft.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadPage()

    return () => {
      isMounted = false
    }
  }, [isReadyHomeSection])

  const setHeroField = <Key extends keyof HomeHeroSection>(
    key: Key,
    value: HomeHeroSection[Key]
  ) => {
    setContent(prev =>
      updateHero(prev, heroSection => ({
        ...heroSection,
        [key]: value,
      }))
    )
  }

  const setHeroImageField = (key: 'src' | 'alt', value: string) => {
    setContent(prev =>
      updateHero(prev, heroSection => ({
        ...heroSection,
        image: {
          ...heroSection.image,
          [key]: value,
        },
      }))
    )
  }

  const setHeroFeatureField = (
    index: number,
    key: 'title' | 'text',
    value: string
  ) => {
    setContent(prev =>
      updateHero(prev, heroSection => ({
        ...heroSection,
        features: heroSection.features.map((feature, featureIndex) =>
          featureIndex === index ? { ...feature, [key]: value } : feature
        ),
      }))
    )
  }

  const setProgramField = <Key extends keyof HomeProgramSection>(
    key: Key,
    value: HomeProgramSection[Key]
  ) => {
    setContent(prev =>
      updateProgram(prev, programSection => ({
        ...programSection,
        [key]: value,
      }))
    )
  }

  const setProgramCtaField = (key: 'label' | 'href', value: string) => {
    setContent(prev =>
      updateProgram(prev, programSection => ({
        ...programSection,
        cta: {
          ...programSection.cta,
          [key]: value,
        },
      }))
    )
  }

  const setProgramBadgeField = (key: 'line1' | 'line2', value: string) => {
    setContent(prev =>
      updateProgram(prev, programSection => ({
        ...programSection,
        badge: {
          ...programSection.badge,
          [key]: value,
        },
      }))
    )
  }

  const setProgramImageField = (
    index: number,
    key: 'src' | 'alt',
    value: string
  ) => {
    setContent(prev =>
      updateProgram(prev, programSection => ({
        ...programSection,
        images: programSection.images.map((image, imageIndex) =>
          imageIndex === index ? { ...image, [key]: value } : image
        ),
      }))
    )
  }

  const setProgramBenefit = (index: number, value: string) => {
    setContent(prev =>
      updateProgram(prev, programSection => ({
        ...programSection,
        benefits: programSection.benefits.map((benefit, benefitIndex) =>
          benefitIndex === index ? value : benefit
        ),
      }))
    )
  }

  const addProgramBenefit = () => {
    setContent(prev =>
      updateProgram(prev, programSection => ({
        ...programSection,
        benefits: [...programSection.benefits, 'New benefit'],
      }))
    )
  }

  const removeProgramBenefit = (index: number) => {
    setContent(prev =>
      updateProgram(prev, programSection => ({
        ...programSection,
        benefits: programSection.benefits.filter(
          (_benefit, benefitIndex) => benefitIndex !== index
        ),
      }))
    )
  }

  const setDestinationsField = <Key extends keyof HomeDestinationsSection>(
    key: Key,
    value: HomeDestinationsSection[Key]
  ) => {
    setContent(prev =>
      updateDestinations(prev, destinationsSection => ({
        ...destinationsSection,
        [key]: value,
      }))
    )
  }

  const setDestinationCardField = (
    index: number,
    key: 'name' | 'image' | 'alt',
    value: string
  ) => {
    setContent(prev =>
      updateDestinations(prev, destinationsSection => ({
        ...destinationsSection,
        destinations: destinationsSection.destinations.map(
          (destination, destinationIndex) =>
            destinationIndex === index
              ? { ...destination, [key]: value }
              : destination
        ),
      }))
    )
  }

  const addDestination = () => {
    setContent(prev =>
      updateDestinations(prev, destinationsSection => ({
        ...destinationsSection,
        destinations: [
          ...destinationsSection.destinations,
          {
            name: 'New Destination',
            image: '/destinations_canada.png',
            alt: 'New study destination',
          },
        ],
      }))
    )
  }

  const removeDestination = (index: number) => {
    setContent(prev =>
      updateDestinations(prev, destinationsSection => ({
        ...destinationsSection,
        destinations: destinationsSection.destinations.filter(
          (_destination, destinationIndex) => destinationIndex !== index
        ),
      }))
    )
  }

  const setWhyChooseUsField = <Key extends keyof HomeWhyChooseUsSection>(
    key: Key,
    value: HomeWhyChooseUsSection[Key]
  ) => {
    setContent(prev =>
      updateWhyChooseUs(prev, whyChooseUsSection => ({
        ...whyChooseUsSection,
        [key]: value,
      }))
    )
  }

  const setWhyChooseUsItemField = (
    index: number,
    key: 'icon' | 'title' | 'text',
    value: string
  ) => {
    setContent(prev =>
      updateWhyChooseUs(prev, whyChooseUsSection => ({
        ...whyChooseUsSection,
        items: whyChooseUsSection.items.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [key]: value } : item
        ),
      }))
    )
  }

  const addWhyChooseUsItem = () => {
    setContent(prev =>
      updateWhyChooseUs(prev, whyChooseUsSection => ({
        ...whyChooseUsSection,
        items: [
          ...whyChooseUsSection.items,
          {
            icon: 'Headphones',
            title: 'New Reason',
            text: 'Add a short reason for choosing Next Level Education.',
          },
        ],
      }))
    )
  }

  const removeWhyChooseUsItem = (index: number) => {
    setContent(prev =>
      updateWhyChooseUs(prev, whyChooseUsSection => ({
        ...whyChooseUsSection,
        items: whyChooseUsSection.items.filter(
          (_item, itemIndex) => itemIndex !== index
        ),
      }))
    )
  }

  const saveDraft = async () => {
    setIsSaving(true)

    try {
      const response = await fetch('/api/admin/cms/pages/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, draftContent: content }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Save draft failed')
      }

      toast.success('Draft saved')
    } catch (error: any) {
      toast.error(error.message || 'Could not save draft')
    } finally {
      setIsSaving(false)
    }
  }

  const publish = async () => {
    setIsPublishing(true)

    try {
      await saveDraft()

      const response = await fetch('/api/admin/cms/pages/home/publish', {
        method: 'POST',
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Publish failed')
      }

      toast.success('Home page published')
    } catch (error: any) {
      toast.error(error.message || 'Could not publish page')
    } finally {
      setIsPublishing(false)
    }
  }

  if (!page || !section) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Section not found</CardTitle>
            <CardDescription>
              This CMS section is not registered yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/cms">Back to CMS Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isReadyHomeSection) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/cms">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
            Next
          </Badge>
        </div>

        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-slate-500">
              Navigation is ready for this section. The editor fields and JSON schema
              will be wired when we convert this page section into CMS content.
            </p>
            <Button asChild>
              <Link href="/admin/cms">Choose another section</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/cms">
                <ArrowLeft className="h-4 w-4" />
                CMS Dashboard
              </Link>
            </Button>
            <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
              Ready
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            {section.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{section.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => setContent(defaultHomePageContent)}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
          <Button
            variant="outline"
            onClick={saveDraft}
            disabled={isLoading || isSaving}
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button
            onClick={publish}
            disabled={isLoading || isPublishing}
            className="bg-[#061331] text-white hover:bg-slate-800"
          >
            <Send className="h-4 w-4" />
            {isPublishing ? 'Publishing...' : 'Publish Page'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-4">
          <Card className="flex max-h-[calc(100vh-2rem)] flex-col overflow-hidden border-slate-200 bg-white shadow-sm xl:sticky xl:top-6">
            <CardHeader className="shrink-0 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-800">
                {isHomeHero
                  ? 'Hero Fields'
                  : isHomeProgram
                    ? 'Program Fields'
                    : isHomeDestinations
                      ? 'Destination Fields'
                      : isHomeWhyChooseUs
                        ? 'Why Choose Us Fields'
                        : 'Section Fields'}
              </CardTitle>
              <CardDescription className="text-xs">
                Changes update the preview instantly before saving.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-0 space-y-5 overflow-y-auto p-6 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="page-title">CMS Page Title</Label>
                <Input
                  id="page-title"
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                />
              </div>

              {isHomeHero && hero && (
                <HomeHeroEditor
                  hero={hero}
                  setHeroField={setHeroField}
                  setHeroImageField={setHeroImageField}
                  setHeroFeatureField={setHeroFeatureField}
                />
              )}

              {isHomeProgram && program && (
                <HomeProgramEditor
                  program={program}
                  setProgramField={setProgramField}
                  setProgramCtaField={setProgramCtaField}
                  setProgramBadgeField={setProgramBadgeField}
                  setProgramImageField={setProgramImageField}
                  setProgramBenefit={setProgramBenefit}
                  addProgramBenefit={addProgramBenefit}
                  removeProgramBenefit={removeProgramBenefit}
                />
              )}

              {isHomeDestinations && destinations && (
                <HomeDestinationsEditor
                  destinations={destinations}
                  setDestinationsField={setDestinationsField}
                  setDestinationCardField={setDestinationCardField}
                  addDestination={addDestination}
                  removeDestination={removeDestination}
                />
              )}

              {isHomeWhyChooseUs && whyChooseUs && (
                <HomeWhyChooseUsEditor
                  whyChooseUs={whyChooseUs}
                  setWhyChooseUsField={setWhyChooseUsField}
                  setWhyChooseUsItemField={setWhyChooseUsItemField}
                  addWhyChooseUsItem={addWhyChooseUsItem}
                  removeWhyChooseUsItem={removeWhyChooseUsItem}
                />
              )}

              {isJsonHomeSection && activeCmsSection && (
                <HomeJsonSectionEditor
                  key={activeCmsSection.id}
                  section={activeCmsSection}
                  onChange={nextSection =>
                    setContent(prev =>
                      updateSectionById(prev, sectionId, nextSection)
                    )
                  }
                />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-8">
          <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100">
              <div>
                <CardTitle className="text-sm font-semibold text-slate-800">
                  Live Preview
                </CardTitle>
                <CardDescription className="text-xs">
                  Same PageRenderer used by the public homepage.
                </CardDescription>
              </div>
              <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                {Object.entries(previewDevices).map(([mode, device]) => {
                  const Icon = device.icon

                  return (
                    <Button
                      key={mode}
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewportMode(mode as PreviewViewportMode)}
                      className={`gap-1.5 text-xs ${
                        viewportMode === mode ? 'bg-white shadow-xs' : ''
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{device.label}</span>
                    </Button>
                  )
                })}
              </div>
            </CardHeader>
            <CardContent className="bg-slate-100 p-0">
              {isLoading ? (
                <div className="flex h-[760px] items-center justify-center text-sm font-semibold text-slate-500">
                  Loading CMS draft...
                </div>
              ) : (
                <ResponsivePreviewFrame device={viewportMode}>
                  <PageRenderer slug="/" content={content} sectionId={sectionId} />
                </ResponsivePreviewFrame>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
