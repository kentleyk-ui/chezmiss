import Link from "next/link";
import { Zap, FileText, Package } from "lucide-react";

export default function AdminDashboard() {
  const adminSections = [
    {
      title: "Pages",
      description: "Gérer les pages du site",
      icon: FileText,
      href: "/admin/pages",
      color: "#B79A5B",
    },
    {
      title: "Produits",
      description: "Gérer les produits",
      icon: Package,
      href: "/admin/products",
      color: "#8B5CF6",
    },
  ];

  return (
    <main className="min-h-screen text-[#f0c9e1] bg-black">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-12">
          <Zap className="w-8 h-8 text-[#B79A5B]" />
          <h1 className="text-4xl font-bold text-[#B79A5B]">TABLEAU DE BORD ADMIN</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group relative rounded-2xl overflow-hidden border border-[#B79A5B]/20 hover:border-[#B79A5B]/50 bg-gradient-to-br from-[#0d0810] to-black p-8 transition-all duration-300"
              >
                {/* Nebula accent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: "radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.15), transparent 60%)"
                }} />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <Icon
                      className="w-8 h-8 transition-transform group-hover:scale-110"
                      style={{ color: section.color }}
                    />
                    <h2 className="text-2xl font-bold text-[#f0c9e1] group-hover:text-[#B79A5B] transition-colors">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-[#f0c9e1]/60 group-hover:text-[#f0c9e1]/80 transition-colors">
                    {section.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[#B79A5B] font-semibold">
                    Accéder
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 pt-12 border-t border-[#B79A5B]/20">
          <h2 className="text-2xl font-bold text-[#B79A5B] mb-6">Informations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl bg-[#0d0810]/50 border border-[#B79A5B]/10 p-6">
              <p className="text-[#f0c9e1]/60 text-sm mb-2">Pages Actives</p>
              <p className="text-3xl font-bold text-[#B79A5B]">2+</p>
            </div>
            <div className="rounded-xl bg-[#0d0810]/50 border border-[#8B5CF6]/10 p-6">
              <p className="text-[#f0c9e1]/60 text-sm mb-2">Produits</p>
              <p className="text-3xl font-bold text-[#8B5CF6]">5</p>
            </div>
            <div className="rounded-xl bg-[#0d0810]/50 border border-[#B79A5B]/10 p-6">
              <p className="text-[#f0c9e1]/60 text-sm mb-2">Sections</p>
              <p className="text-3xl font-bold text-[#B79A5B]">∞</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
