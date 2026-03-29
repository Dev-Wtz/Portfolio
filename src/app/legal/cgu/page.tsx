import type { Metadata } from "next";
import Link from "next/link";
import { getLegalPublisherConfig, LEGAL_ROUTES } from "@/lib/legal-config";
import {
  LegalArticle,
  LegalH2,
  LegalLi,
  LegalP,
  LegalUl,
} from "@/components/legal/LegalUi";

export const metadata: Metadata = {
  title: "Conditions générales d’utilisation",
  description:
    "Modalités d’accès et d’utilisation du site portfolio, propriété intellectuelle et responsabilité.",
  robots: { index: true, follow: true },
};

export default function CGUPage() {
  const c = getLegalPublisherConfig();

  return (
    <LegalArticle title="Conditions générales d’utilisation (CGU)">
      <LegalP>
        Les présentes conditions régissent l’accès et l’utilisation du site{" "}
        <a href={c.siteUrl} className="text-accent underline-offset-2 hover:underline">
          {c.siteUrl}
        </a>{" "}
        (le « Site »), édité par{" "}
        <strong className="text-foreground/95">{c.publisherName}</strong> (l’«
        Éditeur »). En naviguant sur le Site, vous acceptez sans réserve les
        présentes CGU. Si vous n’acceptez pas ces conditions, veuillez ne pas
        utiliser le Site.
      </LegalP>

      <LegalH2 id="objet">Objet</LegalH2>
      <LegalP>
        Le Site a pour objet de présenter l’activité professionnelle de
        l’Éditeur (portfolio, services, moyens de contact), y compris des
        prestations payantes (sites web, logiciels, applications, automatisations)
        proposées aux professionnels et aux particuliers. Il ne constitue pas une
        offre contractuelle ferme sauf mention expresse contraire sur une page
        dédiée ou dans un devis signé.
      </LegalP>

      <LegalH2 id="acces">Accès au Site</LegalH2>
      <LegalP>
        L’accès au Site est libre et gratuit, sous réserve des coûts de
        connexion et d’équipement supportés par l’utilisateur. L’Éditeur se
        réserve le droit de suspendre, interrompre ou limiter l’accès au Site
        pour maintenance, mise à jour ou cas de force majeure, sans indemnité.
      </LegalP>

      <LegalH2 id="comportement">Comportement de l’utilisateur</LegalH2>
      <LegalP>Vous vous engagez à :</LegalP>
      <LegalUl>
        <LegalLi>
          ne pas utiliser le Site à des fins illicites ou portant atteinte aux
          droits de tiers ;
        </LegalLi>
        <LegalLi>
          ne pas tenter d’accéder de manière non autorisée aux systèmes, données
          ou comptes ;
        </LegalLi>
        <LegalLi>
          ne pas diffuser de virus, logiciels malveillants ou contenus
          diffamatoires, haineux ou contraires aux lois ;
        </LegalLi>
        <LegalLi>
          ne pas effectuer de scraping massif sans autorisation écrite
          préalable de l’Éditeur.
        </LegalLi>
      </LegalUl>

      <LegalH2 id="propriete">Propriété intellectuelle</LegalH2>
      <LegalP>
        L’ensemble des éléments composant le Site (textes, visuels, structure,
        charte graphique, code source, bases de données éventuelles, marques et
        logos) est protégé par le droit de la propriété intellectuelle. Ils
        restent la propriété exclusive de l’Éditeur ou de ses ayants droit, sauf
        mention contraire expresse. Certains textes ou visuels du portfolio
        peuvent avoir été produits avec l’assistance d’outils d’intelligence
        artificielle ; en revanche, les sites internet et réalisations présentés
        comme projets sont conçus et développés par l’Éditeur pour ses clients ou
        pour lui-même, sous sa responsabilité créative et technique.
      </LegalP>
      <LegalP>
        Toute reproduction, représentation, modification, distribution ou
        exploitation, totale ou partielle, sans autorisation écrite préalable de
        l’Éditeur, est interdite et constitue une contrefaçon au sens des articles
        L.335-2 et suivants du Code de la propriété intellectuelle, passible de
        sanctions civiles et pénales. Aucun droit de licence implicite n’est
        concédé par la simple consultation du Site.
      </LegalP>

      <LegalH2 id="liens">Liens hypertextes</LegalH2>
      <LegalP>
        Le Site peut contenir des liens vers des sites tiers. L’Éditeur ne
        contrôle pas ces sites et décline toute responsabilité quant à leur
        contenu ou leur politique de confidentialité.
      </LegalP>

      <LegalH2 id="donnees-personnelles">Données personnelles</LegalH2>
      <LegalP>
        Le traitement des données collectées via le Site est décrit dans la{" "}
        <Link href={LEGAL_ROUTES.privacy} className="text-accent underline-offset-2 hover:underline">
          politique de confidentialité
        </Link>{" "}
        et la{" "}
        <Link href={LEGAL_ROUTES.cookies} className="text-accent underline-offset-2 hover:underline">
          politique de cookies
        </Link>
        .
      </LegalP>

      <LegalH2 id="responsabilite">Limitation de responsabilité</LegalH2>
      <LegalP>
        Les informations publiées sur le Site le sont à titre indicatif.
        L’Éditeur ne garantit ni l’exhaustivité ni l’absence d’erreurs. Dans les
        limites permises par la loi, l’Éditeur ne pourra être tenu responsable
        des dommages indirects ou imprévisibles résultant de l’utilisation du
        Site.
      </LegalP>

      <LegalH2 id="modification-cgu">Modification des CGU</LegalH2>
      <LegalP>
        Les CGU peuvent être modifiées à tout moment. La version applicable est
        celle publiée en ligne à la date de votre visite. Il vous appartient de
        consulter régulièrement cette page.
      </LegalP>

      <LegalH2 id="droit-loi">Droit applicable</LegalH2>
      <LegalP>
        Les présentes CGU sont soumises au droit français. Les tribunaux
        français sont compétents, sous réserve des règles impératives
        protectrices des consommateurs.
      </LegalP>

      <LegalH2 id="contact-cgu">Contact</LegalH2>
      <LegalP>
        Pour toute question relative aux présentes CGU :{" "}
        {c.email.includes("@") ? (
          <a href={`mailto:${c.email}`}>{c.email}</a>
        ) : (
          c.email
        )}
        .
      </LegalP>

      <LegalP>
        <strong className="text-foreground/95">Dernière mise à jour :</strong>{" "}
        {new Date().toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        .
      </LegalP>
    </LegalArticle>
  );
}
