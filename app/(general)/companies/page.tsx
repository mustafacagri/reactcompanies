import { useSupabaseService } from '@/services/api/supabaseService'
import { CompanyContainer } from '@/components/companies'

export default async function Companies() {
  const supabaseService = useSupabaseService()
  const featuredCompanies = await supabaseService.fetchCompanies({ isFeatured: true })
  const companies = await supabaseService.fetchCompanies({ isFeatured: false })

  return (
    <>
      <CompanyContainer
        isFeatured
        companies={featuredCompanies}
      />

      <CompanyContainer companies={companies} />
    </>
  )
}
