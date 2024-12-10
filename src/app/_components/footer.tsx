import Link from 'next/link';

const Footer = () => {
  return (
    <div className="min-w-100 shadow-xl">
      <div className="relative mx-auto max-w-7xl p-8">
        <div className="sm:flex sm:gap-10">
          <p className="text-xs text-slate-400">
            The text & visual content on this website related to the Pokémon
            Trading Card Game, including card images and text, is copyrighted by
            The Pokémon Company, Nintendo, Game Freak, and/or Creatures. This
            website is not produced, endorsed, supported, or affiliated with
            Pokémon, Nintendo, Game Freak, or Creatures.
          </p>
          <Link
            href="https://annabaker.dev"
            target="_blank"
            className="min-w-max text-sm text-slate-500 hover:text-purple-600"
          >
            Developed by Anna Baker
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
