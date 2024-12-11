import Link from 'next/link';

const Footer = () => {
  return (
    <div className="min-w-100 shadow-xl">
      <div className="relative mx-auto max-w-7xl p-8">
        <div className="text-sm text-slate-500 sm:flex sm:justify-between sm:gap-10">
          <p className="text-xs text-slate-400">
            V 1.0.0 |{' '}
            <Link
              href="https://github.com/abaker93/tcgp-card-tracker/blob/master/README.md"
              target="_blank"
              className="transition hover:text-rose-950/60"
            >
              Roadmap
            </Link>
            {' | '}
            <Link
              href="https://github.com/abaker93/tcgp-card-tracker/issues"
              target="_blank"
              className="transition hover:text-rose-950/80"
            >
              Report an issue
            </Link>
          </p>

          <Link
            href="https://annabaker.dev"
            target="_blank"
            className="min-w-max transition hover:text-rose-950/80"
          >
            annabaker.dev
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
