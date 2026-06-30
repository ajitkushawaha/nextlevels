import { redirect } from 'next/navigation'

type Params = {
  params: Promise<{ code: string }>
}

export default async function LegacyReferralPage({ params }: Params) {
  const { code } = await params
  redirect(`/register/${encodeURIComponent(code)}`)
}
