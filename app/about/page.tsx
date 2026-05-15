import Link from "next/link"

import {
  Eye,
  Lightbulb,
  Map,
  Target,
  Users,
} from "lucide-react"

import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"

const techStack = [
  "Next.js 16",
  "React 19",
  "MongoDB",
  "Tailwind CSS v4",
  "TypeScript",
  "Better Auth",
  "Mongoose",
  "Vercel",
]

const highlights = [
  {
    icon: Map,
    title: "Belajar Lebih Terarah",
    description:
      "Tidak perlu bingung memilih materi karena roadmap sudah tersusun step-by-step.",
  },

  {
    icon: Lightbulb,
    title: "Kurasi Materi Berkualitas",
    description:
      "Sumber belajar dipilih dari dokumentasi resmi, YouTube, dan platform terbaik.",
  },

  {
    icon: Users,
    title: "Untuk Pelajar Indonesia",
    description:
      "Disusun khusus agar relevan untuk pelajar SMK, mahasiswa, dan pemula Indonesia.",
  },
]

const team = [
  {
    initials: "GSR",
    name: "Gilang Surya Ramadhan",
    role: "Frontend Developer",
  },

  {
    initials: "VTU",
    name: "Vauzi Tri Utomo",
    role: "Backend Developer",
  },

  {
    initials: "SB",
    name: "Suvarna Bhumi",
    role: "Content & Research",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* HERO */}
        <section
          className="
            bg-[var(--muted)]
            py-20 text-center
          "
        >
          <div className="mx-auto max-w-3xl px-4">
            <h1
              className="
                text-4xl font-bold
                text-[var(--text-primary)]
              "
            >
              Tentang Nalaruta
            </h1>

            <p
              className="
                mt-4 text-lg
                text-[var(--text-secondary)]
              "
            >
              Membantu setiap pelajar Indonesia
              menemukan jalur belajar yang tepat
              untuk karier di teknologi.
            </p>
          </div>
        </section>

        {/* MISI VISI */}
        <section
          className="
            mx-auto grid max-w-4xl
            grid-cols-1 gap-8
            px-4 py-16
            md:grid-cols-2
          "
        >
          <div
            className="
              rounded-xl border
              border-[var(--card-border)]
              bg-[var(--card)]
              p-6
            "
          >
            <div
              className="
                mb-4 flex h-12 w-12
                items-center justify-center
                rounded-lg
                bg-[var(--primary-light)]
              "
            >
              <Target
                size={24}
                className="text-[#2563EB]"
              />
            </div>

            <h2
              className="
                text-xl font-bold
                text-[var(--text-primary)]
              "
            >
              Misi
            </h2>

            <p
              className="
                mt-3 leading-relaxed
                text-[var(--text-secondary)]
              "
            >
              Membuat proses belajar teknologi
              menjadi lebih jelas, terarah, dan
              mudah diakses oleh siapa pun tanpa
              harus bingung mulai dari mana.
            </p>
          </div>

          <div
            className="
              rounded-xl border
              border-[var(--card-border)]
              bg-[var(--card)]
              p-6
            "
          >
            <div
              className="
                mb-4 flex h-12 w-12
                items-center justify-center
                rounded-lg
                bg-[var(--primary-light)]
              "
            >
              <Eye
                size={24}
                className="text-[#2563EB]"
              />
            </div>

            <h2
              className="
                text-xl font-bold
                text-[var(--text-primary)]
              "
            >
              Visi
            </h2>

            <p
              className="
                mt-3 leading-relaxed
                text-[var(--text-secondary)]
              "
            >
              Menjadi platform roadmap belajar
              teknologi terbaik untuk pelajar
              Indonesia dengan pendekatan yang
              praktis, modern, dan mudah dipahami.
            </p>
          </div>
        </section>

        {/* KENAPA DIBUAT */}
        <section
          className="
            bg-[var(--muted)]
            py-16
          "
        >
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center">
              <h2
                className="
                  text-3xl font-bold
                  text-[var(--text-primary)]
                "
              >
                Kenapa Nalaruta Dibuat?
              </h2>

              <p
                className="
                  mx-auto mt-4 max-w-3xl
                  leading-relaxed
                  text-[var(--text-secondary)]
                "
              >
                Banyak pelajar bingung mulai
                belajar dari mana. Akibatnya,
                mereka sering loncat-loncat
                tutorial tanpa arah dan akhirnya
                berhenti di tengah jalan.
              </p>

              <p
                className="
                  mx-auto mt-3 max-w-3xl
                  leading-relaxed
                  text-[var(--text-secondary)]
                "
              >
                Nalaruta hadir sebagai Google Maps
                untuk perjalanan karier teknologi
                agar proses belajar lebih terarah
                dan progres lebih terasa nyata.
              </p>
            </div>

            <div
              className="
                mt-12 grid grid-cols-1
                gap-6 md:grid-cols-3
              "
            >
              {highlights.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="
                      rounded-xl border
                      border-[var(--card-border)]
                      bg-[var(--card)]
                      p-6
                    "
                  >
                    <div
                      className="
                        mb-4 flex h-11 w-11
                        items-center justify-center
                        rounded-lg
                        bg-[var(--primary-light)]
                      "
                    >
                      <Icon
                        size={22}
                        className="text-[#2563EB]"
                      />
                    </div>

                    <h3
                      className="
                        font-semibold
                        text-[var(--text-primary)]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-2 text-sm
                        leading-relaxed
                        text-[var(--text-secondary)]
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* TIM */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2
                className="
                  text-3xl font-bold
                  text-[var(--text-primary)]
                "
              >
                Tim Nalaruta
              </h2>

              <p
                className="
                  mt-3
                  text-[var(--text-secondary)]
                "
              >
                Dibangun oleh tim kecil dengan
                fokus membantu pelajar berkembang.
              </p>
            </div>

            <div
              className="
                mt-12 grid grid-cols-1
                gap-6 md:grid-cols-3
              "
            >
              {team.map((member) => (
                <div
                  key={member.name}
                  className="
                    rounded-xl border
                    border-[var(--card-border)]
                    bg-[var(--card)]
                    p-6 text-center
                  "
                >
                  <div
                    className="
                      mx-auto flex h-16 w-16
                      items-center justify-center
                      rounded-full bg-[#2563EB]
                    "
                  >
                    <span
                      className="
                        text-lg font-bold
                        text-white
                      "
                    >
                      {member.initials}
                    </span>
                  </div>

                  <h3
                    className="
                      mt-4 font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    {member.name}
                  </h3>

                  <p
                    className="
                      mt-1 text-sm
                      text-[var(--text-secondary)]
                    "
                  >
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section
          className="
            bg-[var(--muted)]
            py-16 text-center
          "
        >
          <div className="mx-auto max-w-5xl px-4">
            <h2
              className="
                text-3xl font-bold
                text-[var(--text-primary)]
              "
            >
              Dibangun dengan Teknologi Terkini
            </h2>

            <div
              className="
                mt-10 flex flex-wrap
                justify-center gap-3
              "
            >
              {techStack.map((tech) => (
                <div
                  key={tech}
                  className="
                    flex items-center gap-2
                    rounded-lg border
                    border-[var(--card-border)]
                    bg-[var(--card)]
                    px-5 py-2.5 text-sm
                    font-medium
                  "
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="
            bg-[#2563EB]
            py-16 text-center
          "
        >
          <div className="mx-auto max-w-3xl px-4">
            <h2
              className="
                text-3xl font-bold
                text-white
              "
            >
              Siap Mulai?
            </h2>

            <p
              className="
                mt-3 text-white/80
              "
            >
              Bangun skill teknologi secara
              terarah dan mulai perjalanan
              kariermu hari ini.
            </p>

            <Link
              href="/register"
              className="
                mt-8 inline-block
                rounded-lg bg-white
                px-8 py-3 font-semibold
                text-[#2563EB]
              "
            >
              Daftar Gratis
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}