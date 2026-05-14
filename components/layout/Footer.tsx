import Link from "next/link"

export default function Footer() {
  return (
    <footer
      className="
        border-t border-[var(--card-border)]
        bg-[var(--muted)]
      "
    >
      <div
        className="
          mx-auto max-w-7xl
          px-4 py-10
        "
      >
        <div
          className="
            grid grid-cols-1 gap-8
            sm:grid-cols-2
            md:grid-cols-4
          "
        >
          {/* COL 1 */}
          <div>
            <h2
              className="
                text-xl font-bold
                text-[var(--text-primary)]
              "
            >
              Nalaruta
            </h2>

            <p
              className="
                mt-2 text-sm
                text-[var(--text-muted)]
              "
            >
              Peta perjalananmu menuju
              karier impian.
            </p>
          </div>

          {/* COL 2 */}
          <div>
            <h3
              className="
                mb-3 text-sm font-semibold
                text-[var(--text-primary)]
              "
            >
              Produk
            </h3>

            <Link
              href="/explore"
              className="
                mb-2 block text-sm
                text-[var(--text-secondary)]

                hover:text-[var(--text-primary)]
              "
            >
              Explore
            </Link>

            <Link
              href="#"
              className="
                mb-2 block text-sm
                text-[var(--text-secondary)]

                hover:text-[var(--text-primary)]
              "
            >
              Cara Kerja
            </Link>

            <Link
              href="#"
              className="
                block text-sm
                text-[var(--text-secondary)]

                hover:text-[var(--text-primary)]
              "
            >
              Fitur
            </Link>
          </div>

          {/* COL 3 */}
          <div>
            <h3
              className="
                mb-3 text-sm font-semibold
                text-[var(--text-primary)]
              "
            >
              Belajar
            </h3>

            {[
              "Frontend Dev",
              "Backend Dev",
              "UI/UX",
              "Data Analyst",
            ].map((item) => (
              <Link
                key={item}
                href="#"
                className="
                  mb-2 block text-sm
                  text-[var(--text-secondary)]

                  hover:text-[var(--text-primary)]
                "
              >
                {item}
              </Link>
            ))}
          </div>

          {/* COL 4 */}
          <div>
            <h3
              className="
                mb-3 text-sm font-semibold
                text-[var(--text-primary)]
              "
            >
              Info
            </h3>

            {[
              "Tentang Kami",
              "Kontak",
              "Blog",
            ].map((item) => (
              <Link
                key={item}
                href="#"
                className="
                  mb-2 block text-sm
                  text-[var(--text-secondary)]

                  hover:text-[var(--text-primary)]
                "
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div
          className="
            mt-8 border-t
            border-[var(--card-border)]
            pt-6
          "
        >
          <p
            className="
              text-sm
              text-[var(--text-muted)]
            "
          >
            © 2025 Nalaruta. Dibuat untuk
            pelajar Indonesia.
          </p>
        </div>
      </div>
    </footer>
  )
}