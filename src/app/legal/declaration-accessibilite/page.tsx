import type { Metadata } from "next";
import { getLegalPublisherConfig } from "@/lib/legal-config";
import {
  LegalArticle,
  LegalH2,
  LegalLi,
  LegalP,
  LegalUl,
} from "@/components/legal/LegalUi";

export const metadata: Metadata = {
  title: "Déclaration d’accessibilité",
  description:
    "Engagement d’accessibilité numérique, état de conformité et contact pour signaler un obstacle.",
  robots: { index: true, follow: true },
};

export default function DeclarationAccessibilitePage() {
  const c = getLegalPublisherConfig();

  return (
    <LegalArticle title="Déclaration d’accessibilité">
      <LegalP>
        <strong className="text-foreground/95">Déclaration provisoire.</strong>{" "}
        {c.publisherName} s’engage à rendre son site web accessible conformément
        à l’article 47 de la loi n° 2005-102 du 11 février 2005 et aux référentiels
        en vigueur (RGAA — Référentiel général d’amélioration de l’accessibilité
        pour les services en ligne de l’État, et bonnes pratiques pour les sites
        privés souhaitant respecter les standards WCAG 2.1 niveau AA).
      </LegalP>

      <LegalH2 id="etat-conformite">État de conformité</LegalH2>
      <LegalP>
        Une évaluation formelle complète (audit interne ou externe selon le RGAA
        / WCAG 2.1 niveau AA) est{" "}
        <strong className="text-foreground/95">en cours ou prévue</strong>. En
        l’absence d’audit publié à la date de la présente déclaration, le Site
        est présenté comme{" "}
        <strong className="text-foreground/95">partiellement conforme</strong>{" "}
        ou <strong className="text-foreground/95">non évalué</strong> au sens
        strict du RGAA, tout en suivant des bonnes pratiques d’accessibilité lors
        du développement et des mises à jour.
      </LegalP>
      <LegalP>
        Les efforts suivants sont notamment pris en compte :
      </LegalP>
      <LegalUl>
        <LegalLi>structure sémantique (titres, landmarks, listes) ;</LegalLi>
        <LegalLi>textes alternatifs pour les images informatives ;</LegalLi>
        <LegalLi>contraste des couleurs et tailles de texte lisibles ;</LegalLi>
        <LegalLi>navigation au clavier et états de focus visibles ;</LegalLi>
        <LegalLi>
          prise en compte de la préférence « réduire les animations » sur les
          composants concernés.
        </LegalLi>
      </LegalUl>
      <LegalP>
        Si vous relevez un défaut d’accessibilité, merci de nous en faire part
        (voir ci-dessous) : nous étudierons votre signalement et vous
        proposerons, le cas échéant, une solution de contournement raisonnable.
      </LegalP>

      <LegalH2 id="non-accessible">Contenus non accessibles</LegalH2>
      <LegalP>
        Les contenus suivants peuvent présenter des limites d’accessibilité
        (liste indicative, à adapter après audit réel) :
      </LegalP>
      <LegalUl>
        <LegalLi>
          expériences 3D / WebGL (canvas) : alternatives textuelles ou
          désactivation souhaitable ;
        </LegalLi>
        <LegalLi>
          certains composants tiers si intégrés ultérieurement sans revue
          d’accessibilité.
        </LegalLi>
      </LegalUl>

      <LegalH2 id="signalement">Signalement et contact</LegalH2>
      <LegalP>
        Si vous n’arrivez pas à accéder à un contenu ou à un service, vous
        pouvez contacter :
      </LegalP>
      <LegalUl>
        <LegalLi>
          <strong className="text-foreground/95">E-mail :</strong>{" "}
          {c.email.includes("@") ? (
            <a href={`mailto:${c.email}`}>{c.email}</a>
          ) : (
            c.email
          )}
        </LegalLi>
      </LegalUl>
      <LegalP>
        Un accusé de réception ou une réponse substantielle vous sera adressé{" "}
        <strong className="text-foreground/95">
          dans un délai maximal de quatorze (14) jours ouvrés
        </strong>{" "}
        à compter de la réception de votre message. Ce délai peut être prolongé
        si la complexité du signalement l’exige ; vous en serez alors informé.
      </LegalP>

      <LegalH2 id="voies-recours">Voies de recours</LegalH2>
      <LegalP>
        Si la réponse reçue n’est pas satisfaisante, vous pouvez saisir le
        Défenseur des droits ou les délégués régionaux du Défenseur des droits,
        ou utiliser le référentiel public dédié à l’accessibilité selon votre
        situation. Informations :{" "}
        <a
          href="https://www.defenseurdesdroits.fr/"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 hover:underline"
        >
          www.defenseurdesdroits.fr
        </a>
        .
      </LegalP>

      <LegalH2 id="mise-a-jour-a11y">Mise à jour</LegalH2>
      <LegalP>
        Cette déclaration est révisée lors d’évolutions majeures du Site.
        Dernière mise à jour :{" "}
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
