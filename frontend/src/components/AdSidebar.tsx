import AdSlot from './AdSlot'

interface AdSidebarProps {
  className?: string
  sticky?: boolean
}

const AdSidebar = ({ className = '', sticky = true }: AdSidebarProps) => {
  return (
    <aside className={`${sticky ? 'sticky top-24' : ''} ${className}`}>
      <div className="space-y-6">
        {/* First Ad - Rectangle */}
        <AdSlot
          position="sidebar-top"
          format="rectangle"
          size="300x250"
          priority="premium"
          title="Premium İş Elanları"
          description="Yüksək maaşlı vakansiyalar"
          link="#"
        />

        {/* Second Ad - Skyscraper (if space allows) */}
        <div className="hidden lg:block">
          <AdSlot
            position="sidebar-middle"
            format="rectangle"
            size="300x600"
            priority="standard"
            title="Karyera İnkişafı"
            description="Peşəkar təlim proqramları və sertifikatlar"
            link="#"
          />
        </div>

        {/* Third Ad - Rectangle */}
        <AdSlot
          position="sidebar-bottom"
          format="rectangle"
          size="300x250"
          priority="standard"
          title="HR Xidmətləri"
          description="İşə qəbul proseslərinizi optimallaşdırın"
          link="#"
        />
      </div>
    </aside>
  )
}

export default AdSidebar

