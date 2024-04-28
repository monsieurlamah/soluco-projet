import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-gray-200 py-6 px-10 flex justify-center items-center">
      <div className="max-w-4xl flex flex-col justify-center items-center gap-4">
        <p className="text-lg font-semibold">Liens rapides :</p>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-red-1">
            Accueil
          </Link>
          <Link href="/about" className="hover:text-red-1">
            À propos
          </Link>
          <Link href="/contact" className="hover:text-red-1">
            Contact
          </Link>
        </div>
        <p className="text-sm">© 2024 Soluco. Tous droits réservés.</p>
      </div>
    </div>
  );
};

export default Footer;
