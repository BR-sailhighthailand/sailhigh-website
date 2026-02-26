import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSnapshot from '@/components/sections/AboutSnapshot'
import SolutionsSection from '@/components/sections/SolutionsSection'
import ImplementationSection from '@/components/sections/ImplementationSection'
import IndustriesSection from '@/components/sections/IndustriesSection'
import WhyChooseSection from '@/components/sections/WhyChooseSection'
import SecuritySection from '@/components/sections/SecuritySection'
import ContactCTA from '@/components/sections/ContactCTA'
import homeData from '@/content/home.json'

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Sail High Software Solutions',
            url: 'https://sailhighthailand.com',
            logo: 'https://sailhighthailand.com/logo.png',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'Hello@sailhighthailand.com',
              contactType: 'customer support',
            },
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'TH',
            },
            description:
              'Thailand-based technology company delivering enterprise systems, smart education platforms, and professional IT staffing services.',
          }),
        }}
      />

      <Header />

      <main id="main-content">
        <HeroSection {...homeData.hero} />
        <AboutSnapshot {...homeData.about_snapshot} />
        <SolutionsSection {...homeData.solutions} />
        <ImplementationSection {...homeData.implementation} />
        <IndustriesSection {...homeData.industries} />
        <WhyChooseSection {...homeData.why_choose} />
        <SecuritySection {...homeData.security} />
        <ContactCTA {...homeData.contact_cta} />
      </main>

      <Footer />
    </>
  )
}
