import type { Metadata } from "next";
import Link from "next/link";
import {
  getLegalPublisherConfig,
  LEGAL_ROUTES,
} from "@/lib/legal-config";
import {
  LegalArticle,
  LegalH2,
  LegalLi,
  LegalP,
  LegalUl,
} from "@/components/legal/LegalUi";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Informations réglementaires sur l’éditeur, l’hébergement et les obligations légales du site.",
  robots: { index: true, follow: true },
};

function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits.replace(/\++/g, "+");
  return digits.length > 0 ? `+${digits}` : phone;
}

export default function MentionsLegalesPage() {
  const c = getLegalPublisherConfig();
  const phoneHref = /^[\d\s+().-]{8,}$/u.test(c.phone)
    ? telHref(c.phone)
    : null;
  const hostContactUrl = c.hostPhone.match(/https?:\/\/[^\s]+/)?.[0] ?? null;

  return (
    <LegalArticle title="Mentions légales">
      <LegalP>
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
        pour la confiance en l’économie numérique, il est porté à la
        connaissance des utilisateurs du site les présentes mentions légales.
      </LegalP>

      <LegalH2 id="editeur">Éditeur du site</LegalH2>
      <LegalUl>
        <LegalLi>
          <strong className="text-foreground/95">Raison sociale / Nom :</strong>{" "}
          {c.publisherName}
        </LegalLi>
        <LegalLi>
          <strong className="text-foreground/95">Statut :</strong> {c.legalForm}
        </LegalLi>
        <LegalLi>
          <strong className="text-foreground/95">Adresse :</strong>{" "}
          {c.addressLine}
        </LegalLi>
        <LegalLi>
          <strong className="text-foreground/95">SIRET :</strong> {c.siret}
        </LegalLi>
        <LegalLi>
          <strong className="text-foreground/95">TVA :</strong> {c.vatNumber}
        </LegalLi>
        <LegalLi>
          <strong className="text-foreground/95">E-mail :</strong>{" "}
          {c.email.includes("@") ? (
            <a href={`mailto:${c.email}`}>{c.email}</a>
          ) : (
            c.email
          )}
        </LegalLi>
        <LegalLi>
          <strong className="text-foreground/95">Téléphone :</strong>{" "}
          {phoneHref ? (
            <a href={`tel:${phoneHref}`}>{c.phone}</a>
          ) : (
            c.phone
          )}
        </LegalLi>
        <LegalLi>
          <strong className="text-foreground/95">URL du site :</strong>{" "}
          <a href={c.siteUrl}>{c.siteUrl}</a>
        </LegalLi>
      </LegalUl>
      <LegalP>
        L’éditeur s’efforce d’assurer l’exactitude des informations publiées
        et de tenir ces mentions à jour. Pour un autre déploiement, les
        informations peuvent être surchargées via les variables
        d’environnement documentées dans{" "}
        <code className="text-accent">.env.example</code>.
      </LegalP>

      <LegalH2 id="hebergement">Hébergement</LegalH2>
      <LegalP>Le site est hébergé par :</LegalP>
      <LegalUl>
        <LegalLi>
          <strong className="text-foreground/95">Dénomination :</strong>{" "}
          {c.hostName}
        </LegalLi>
        <LegalLi>
          <strong className="text-foreground/95">Adresse :</strong>{" "}
          {c.hostAddress}
        </LegalLi>
        <LegalLi>
          <strong className="text-foreground/95">Contact :</strong>{" "}
          {hostContactUrl ? (
            <a href={hostContactUrl} rel="noopener noreferrer">
              {c.hostPhone}
            </a>
          ) : (
            c.hostPhone
          )}
        </LegalLi>
      </LegalUl>

      <LegalH2 id="propriete-intellectuelle">Propriété intellectuelle</LegalH2>
      <LegalP>
        L’ensemble des éléments composant le site (textes, visuels, logos,
        structure, code, bases de données, etc.) est protégé par le droit de la
        propriété intellectuelle. Toute reproduction, représentation,
        modification ou exploitation non autorisée est interdite et constitue
        une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
      </LegalP>
      <LegalP>
        Les marques et logos tiers éventuellement cités appartiennent à leurs
        propriétaires respectifs.
      </LegalP>

      <LegalH2 id="donnees">Données personnelles</LegalH2>
      <LegalP>
        Les traitements de données personnelles sont décrits dans la{" "}
        <Link href={LEGAL_ROUTES.privacy} className="text-accent underline-offset-2 hover:underline">
          politique de confidentialité
        </Link>
        . Vous disposez d’un droit d’accès, de rectification, d’effacement, de
        limitation, d’opposition et de portabilité conformément au Règlement
        (UE) 2016/679 (RGPD) et à la loi « Informatique et Libertés ».
      </LegalP>

      <LegalH2 id="cookies">Cookies et traceurs</LegalH2>
      <LegalP>
        Des cookies ou traceurs peuvent être utilisés. Les modalités sont
        détaillées dans la{" "}
        <Link href={LEGAL_ROUTES.cookies} className="text-accent underline-offset-2 hover:underline">
          politique de cookies
        </Link>
        . Vous pouvez paramétrer votre choix via la bannière affichée lors de
        votre première visite.
      </LegalP>

      <LegalH2 id="responsabilite">Limitation de responsabilité</LegalH2>
      <LegalP>
        Les informations publiées le sont à titre indicatif. L’éditeur ne saurait
        être tenu responsable des dommages directs ou indirects résultant de
        l’accès au site, de son utilisation ou de l’impossibilité d’y accéder,
        notamment en cas de maintenance, de virus ou de dysfonctionnement
        technique.
      </LegalP>
      <LegalP>
        Le site peut contenir des liens hypertextes vers des sites tiers ;
        l’éditeur n’exerce aucun contrôle sur leur contenu et décline toute
        responsabilité à leur égard.
      </LegalP>

      <LegalH2 id="droit-applicable">Droit applicable et litiges</LegalH2>
      <LegalP>
        Les présentes mentions sont régies par le droit français. En cas de
        litige, et à défaut de résolution amiable, les tribunaux français
        seront seuls compétents, sous réserve des règles de compétence
        impératives applicables aux consommateurs.
      </LegalP>

      <LegalH2 id="mediation">Médiation de la consommation</LegalH2>
      <LegalP>
        {c.publisherName} adresse des prestations payantes aux professionnels
        et aux consommateurs (création de sites web, logiciels, applications et
        automatisations). Conformément aux articles L.612-1 et suivants du Code
        de la consommation, tout consommateur a le droit de recourir
        gratuitement à un médiateur de la consommation en cas de litige, après
        une démarche préalable écrite auprès de l’éditeur restée infructueuse.
      </LegalP>
      <LegalP>
        Les coordonnées du médiateur de la consommation dont l’éditeur est
        membre ou auquel il est affilié seront indiquées ici dès finalisation de
        cette adhésion. En attendant, vous pouvez consulter les informations
        officielles sur la médiation :{" "}
        <a
          href="https://www.economie.gouv.fr/mediation-conso"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 hover:underline"
        >
          www.economie.gouv.fr/mediation-conso
        </a>
        . Vous pouvez également demander par e-mail les informations utiles à{" "}
        {c.email.includes("@") ? (
          <a href={`mailto:${c.email}`}>{c.email}</a>
        ) : (
          c.email
        )}
        .
      </LegalP>

      <LegalH2 id="cnil">Réclamation auprès de la CNIL</LegalH2>
      <LegalP>
        Vous pouvez introduire une réclamation auprès de la Commission nationale
        de l’informatique et des libertés (CNIL) :{" "}
        <a href={c.cnilComplaintUrl} rel="noopener noreferrer">
          {c.cnilComplaintUrl}
        </a>
        .
      </LegalP>

      <LegalH2 id="contact">Contact</LegalH2>
      <LegalP>
        Pour toute question relative au site ou aux présentes mentions :{" "}
        {c.email.includes("@") ? (
          <a href={`mailto:${c.email}`}>{c.email}</a>
        ) : (
          c.email
        )}
        .
      </LegalP>

      <LegalH2 id="mise-a-jour">Mise à jour</LegalH2>
      <LegalP>
        Les mentions légales peuvent être modifiées à tout moment. La version
        en ligne fait foi. Dernière mise à jour :{" "}
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
