import { useSupabaseService } from '@/services/api/supabaseService'
import { CompanyProfile } from '@/components/companies'
import { notFound } from 'next/navigation'

export default async function Profile({ params }: Readonly<{ params: { slug: string } }>) {
  const supabaseService = useSupabaseService()

  // Get the slug from the params object
  const { slug } = params

  // Fetch company data based on the slug
  const company = await supabaseService.fetchCompany({ slug })
  let jobs = []

  // Handle case where no company is found
  if (!company) {
    // You can redirect to a 404 page or handle the error in some other way
    notFound() // This will trigger the Next.js 404 page
  } else {
    jobs = await supabaseService.fetchJobs({ company_id: company.id })
  }

  // Render the company profile if data is available
  return (
    <CompanyProfile
      company={company}
      jobs={jobs}
    />
  )
}
