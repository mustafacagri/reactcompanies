import Link from 'next/link'
import { Company } from '@/interfaces'
import { $t } from '@/utils/translationHelper'

export default function CompaniesBox({ company }: Readonly<{ company: Company }>) {
  // Define the type for the fields array
  type Field = {
    key: keyof Company // Use keyof Company to ensure the keys are valid properties of Company
    label: string
  }

  const workingTypes = () => {
    // Define the fields array
    const fields: Field[] = [
      { key: 'is_remote', label: $t('generic.remote') },
      { key: 'is_hybrid', label: $t('generic.hybrid') },
      { key: 'is_hiring', label: $t('generic.hiring') },
    ]

    return fields
      .filter(({ key }) => typeof company?.[key] === 'boolean')
      .map(({ key, label }) => ({
        label,
        value: company[key] ? '✅' : '❌',
      }))
  }

  const src = company?.is_featured
    ? `/images/small-companies/${company.slug}.jpeg`
    : company?.logo ?? '/images/small-companies/react-companies.jpeg'

  return (
    <Link
      href={`/companies/${company.slug}`}
      className='smallBoxCompany bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200 transition duration-300 ease-in-out'
    >
      <div className='flex items-center'>
        <img
          src={src}
          alt={company?.name}
          className='h-16 w-16 object-contain rounded-lg'
        />
        <div className='ml-4'>
          <h3 className='text-md font-semibold text-left'>{company.name}</h3>

          <div className='flex items-center mt-1'>
            {workingTypes().map(({ label, value }) => (
              <span
                key={label}
                className='ml-1 inline-block bg-slate-50 rounded-lg px-2 py-2 sm:py-1 text-xs text-gray-700'
              >
                <span className='mx-auto block h-5 w-5 sm:mr-1 sm:h-auto sm:w-auto sm:inline-block'>{value}</span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className='mt-4 text-xs text-gray-600 text-left line-clamp-2'>{company.description}</p>
    </Link>
  )
}
