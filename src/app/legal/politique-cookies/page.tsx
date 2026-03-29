import type { Metadata } from "next";
import Link from "next/link";
import { getLegalPublisherConfig, LEGAL_ROUTES } from "@/lib/legal-config";
import {
  LegalArticle,
  LegalH2,
  LegalH3,
  LegalLi,
  LegalP,
  LegalUl,
} from "@/components/legal/LegalUi";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description:
    "Liste des cookies et traceurs, finalités, durées et gestion du consentement.",
  robots: { index: true, follow: true },
};

export default function PolitiqueCookiesPage() {
  const c = getLegalPublisherConfig();

  return (
    <LegalArticle title="Politique relative aux cookies et traceurs">
      <LegalP>
        Cette page explique ce qu’est un cookie, quels traceurs peuvent être
        utilisés sur le site{" "}
        <a href={c.siteUrl} className="text-accent underline-offset-2 hover:underline">
          {c.siteUrl}
        </a>
        , et comment paramétrer vos choix.
      </LegalP>

      <LegalH2 id="definition">Qu’est-ce qu’un cookie ?</LegalH2>
      <LegalP>
        Un cookie est un petit fichier texte déposé sur votre terminal
        (ordinateur, tablette, smartphone) lors de la visite d’un site. Les
        traceurs équivalents (stockage local, pixels, SDK) sont soumis aux
        mêmes règles lorsqu’ils permettent de vous identifier ou de suivre votre
        navigation.
      </LegalP>

      <LegalH2 id="base-legale">Base légale</LegalH2>
      <LegalP>
        Les cookies strictement nécessaires au fonctionnement du site ou à la
        sécurité peuvent être déposés sans consentement préalable, sur le fondement
        de l’intérêt légitime ou de l’exécution d’un contrat. Les cookies
        non essentiels (mesure d’audience détaillée, publicité, réseaux sociaux,
        etc.) nécessitent votre consentement préalable, conformément aux
        lignes directrices de la CNIL et au RGPD.
      </LegalP>

      <LegalH2 id="liste">Cookies utilisés sur ce site</LegalH2>
      <LegalP>
        Le Site utilise une bannière de consentement avec un seul choix pour les
        traceurs non essentiels : la mesure d’audience (Google Analytics 4).
        Ces traceurs ne sont déposés qu’après acceptation via la bannière. Vous
        pouvez retirer votre consentement à tout moment en effaçant les cookies
        du Site dans votre navigateur et en refusant à nouveau lors de la
        prochaine visite, ou via le module de désactivation proposé par Google :{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout?hl=fr"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 hover:underline"
        >
          outil de désactivation Google Analytics
        </a>
        .
      </LegalP>

      <div className="overflow-x-auto rounded-xl border border-card-border">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-card-border bg-card/80">
              <th className="p-3 font-semibold text-foreground">Nom / catégorie</th>
              <th className="p-3 font-semibold text-foreground">Finalité</th>
              <th className="p-3 font-semibold text-foreground">Durée</th>
              <th className="p-3 font-semibold text-foreground">Consentement</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            <tr className="border-b border-card-border/80">
              <td className="p-3 font-medium text-foreground/90">
                Cookies techniques / session
              </td>
              <td className="p-3">
                Fonctionnement du site (sécurité, équilibrage de charge,
                préférences d’affichage essentielles).
              </td>
              <td className="p-3">Session ou quelques mois selon le besoin.</td>
              <td className="p-3">Non soumis au consentement (nécessaires).</td>
            </tr>
            <tr className="border-b border-card-border/80">
              <td className="p-3 font-medium text-foreground/90">
                Préférences cookies (localStorage)
              </td>
              <td className="p-3">
                Mémoriser votre choix sur la bannière (accepter / refuser les
                cookies non essentiels).
              </td>
              <td className="p-3">12 mois recommandés (renouveler le consentement).</td>
              <td className="p-3">
                Déposé après action sur la bannière ; nécessaire à l’expression
                du choix.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-foreground/90">
                Google Analytics 4 (cookies _ga, _ga_* selon configuration)
              </td>
              <td className="p-3">
                Mesure d’audience et statistiques de fréquentation du Site ;
                chargement conditionné au consentement « analytics » dans la
                bannière.
              </td>
              <td className="p-3">
                Jusqu’à 24 mois pour certains cookies (voir politique de Google) ;
                durées indicatives soumises à l’évolution du produit.
              </td>
              <td className="p-3">Consentement requis avant dépôt.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <LegalH2 id="gestion">Gérer vos choix</LegalH2>
      <LegalUl>
        <LegalLi>
          Via la bannière affichée lors de votre première visite (boutons
          « Tout accepter » ou « Refuser les cookies non essentiels »).
        </LegalLi>
        <LegalLi>
          Via les paramètres de votre navigateur : vous pouvez bloquer ou
          supprimer les cookies (menu « Confidentialité » ou équivalent).
        </LegalLi>
      </LegalUl>
      <LegalP>
        La suppression des cookies peut affecter certaines fonctionnalités du
        Site.
      </LegalP>

      <LegalH2 id="duree-consentement">Durée de validité du consentement</LegalH2>
      <LegalP>
        Conformément aux recommandations de la CNIL, le consentement aux cookies
        non essentiels est sollicité à nouveau au plus tard treize mois après
        le dernier enregistrement de votre choix. La version du consentement
        est enregistrée avec la date pour permettre ce renouvellement.
      </LegalP>

      <LegalH2 id="contact-cookies">Contact</LegalH2>
      <LegalP>
        Pour toute question sur cette politique :{" "}
        {c.email.includes("@") ? (
          <a href={`mailto:${c.email}`}>{c.email}</a>
        ) : (
          c.email
        )}
        . Voir aussi la{" "}
        <Link href={LEGAL_ROUTES.privacy} className="text-accent underline-offset-2 hover:underline">
          politique de confidentialité
        </Link>
        .
      </LegalP>

      <LegalH3>Mise à jour</LegalH3>
      <LegalP>
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
