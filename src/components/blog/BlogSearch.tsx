'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function BlogSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(
    searchParams?.get('search') || ''
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    const url = new URL(window.location.href)
    if (value) {
      url.searchParams.set('search', value)
    } else {
      url.searchParams.delete('search')
    }
    router.push(url.toString())
  }

  return (
    <div className="relative  md:w-3/5 w-full mx-auto mt-4">
      <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#d7a23a]" />
      <Input
        placeholder="Search articles, topics, or keywords..."
        value={searchValue}
        onChange={handleSearch}
        className="w-full py-6 pl-12 pr-6 md:text-lg text-sm rounded-full transition-all duration-200 bg-white border border-[#061331]/20 text-[#061331] placeholder-[#061331]/50 shadow-md focus:border-[#d7a23a] focus:ring-1 focus:ring-[#d7a23a] focus:outline-none"
      />
    </div>
  )
}
