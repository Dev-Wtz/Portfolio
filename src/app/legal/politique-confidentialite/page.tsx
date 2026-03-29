import type { Metadata } from "next";
import Link from "next/link";
import {
  getLegalPublisherConfig,
  LEGAL_ROUTES,
} from "@/lib/legal-config";
import {
  LegalArticle,
  LegalH2,
  LegalH3,
  LegalLi,
  LegalP,
  LegalUl,
} from "@/components/legal/LegalUi";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Traitement des données personnelles, bases légales, durées de conservation et droits RGPD.",
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  const c = getLegalPublisherConfig();

  return (
    <LegalArticle title="Politique de confidentialité">
      <LegalP>
        La présente politique décrit comment{" "}
        <strong className="text-foreground/95">{c.publisherName}</strong>{" "}
        (ci-après « nous ») traite les données personnelles collectées via le
        site{" "}
        <a href={c.siteUrl} className="text-accent underline-offset-2 hover:underline">
          {c.siteUrl}
        </a>{" "}
        (ci-après le « Site »), conformément au Règlement (UE) 2016/679 (RGPD)
        et à la loi n° 78-17 du 6 janvier 1978 modifiée (« Informatique et
        Libertés »). Le Site s’adresse aux professionnels comme aux
        particuliers.
      </LegalP>

      <LegalH2 id="responsable">Responsable du traitement</LegalH2>
      <LegalUl>
        <LegalLi>{c.publisherName}</LegalLi>
        <LegalLi>{c.addressLine}</LegalLi>
        <LegalLi>
          E-mail :{" "}
          {c.email.includes("@") ? (
            <a href={`mailto:${c.email}`}>{c.email}</a>
          ) : (
            c.email
          )}
        </LegalLi>
      </LegalUl>
      <LegalP>
        Pour l’exercice de vos droits sur vos données :{" "}
        <strong className="text-foreground/95">{c.dpoEmail}</strong>
        {c.dpoEmail.includes("@") ? (
          <>
            {" "}
            (<a href={`mailto:${c.dpoEmail}`}>contacter</a>)
          </>
        ) : null}
        .
      </LegalP>

      <LegalH2 id="donnees-collectees">Données collectées et finalités</LegalH2>

      <LegalH3>Navigation sur le Site</LegalH3>
      <LegalP>
        Des données techniques (adresse IP, logs serveur, type de navigateur,
        pages consultées) peuvent être collectées automatiquement par
        l’hébergeur ou des outils techniques nécessaires au bon
        fonctionnement et à la sécurité du Site. Finalités : sécurité,
        maintenance, statistiques techniques anonymisées le cas échéant.
      </LegalP>

      <LegalH3>Formulaire de contact et e-mail</LegalH3>
      <LegalP>
        Lorsque vous nous contactez via le formulaire du Site ou directement
        par courrier électronique, nous collectons notamment : nom ou
        identifiant fourni, adresse e-mail, contenu du message, ainsi que les
        métadonnées habituellement associées à un e-mail (horodatage, en-têtes
        techniques). Le formulaire sert à échanger avec nous et peut, le cas
        échéant, déboucher sur l’établissement d’un devis si vous en faites la
        demande.
      </LegalP>
      <LegalUl>
        <LegalLi>
          <strong className="text-foreground/95">Finalité :</strong> répondre à
          votre demande, vous recontacter dans le cadre de votre sollicitation,
          et préparer une éventuelle relation contractuelle (devis, proposition
          commerciale).
        </LegalLi>
        <LegalLi>
          <strong className="text-foreground/95">Conservation :</strong> les
          messages envoyés via le formulaire sont transmis de façon sécurisée
          depuis le serveur du Site vers notre messagerie professionnelle
          (protocole SMTP) ; ils y sont conservés. Aucune base de données dédiée
          sur le Site n’archive le contenu des messages au-delà de ce qui est
          nécessaire à la transmission.
        </LegalLi>
        <LegalLi>
          <strong className="text-foreground/95">Base légale :</strong>{" "}
          l’exécution de mesures précontractuelles ou l’intérêt légitime de
          répondre aux sollicitations (article 6(1)(b) ou (f) RGPD).
        </LegalLi>
        <LegalLi>
          <strong className="text-foreground/95">Durée :</strong> durée
          nécessaire au traitement de la demande, puis archivage avec limitation
          en cas d’obligation légale ou de litige (en général 3 ans à compter du
          dernier contact en droit de la consommation pour les relations
          clients, sauf prescription plus longue).
        </LegalLi>
      </LegalUl>

      <LegalH3>Cookies et traceurs</LegalH3>
      <LegalP>
        Voir la{" "}
        <Link href={LEGAL_ROUTES.cookies} className="text-accent underline-offset-2 hover:underline">
          politique de cookies
        </Link>
        . Les préférences enregistrées via la bannière sont stockées localement
        sur votre terminal (stockage navigateur). Lorsque vous acceptez la
        mesure d’audience, Google Analytics (Google Ireland Limited / Google
        LLC) peut traiter des données relatives à votre navigation ; ce
        traitement repose sur votre consentement.
      </LegalP>

      <LegalH2 id="destinataires">Destinataires et sous-traitants</LegalH2>
      <LegalP>
        Les données sont destinées à {c.publisherName} et, selon les cas, à des
        prestataires strictement nécessaires au fonctionnement du Site : notamment
        l’hébergeur ({c.hostName}), le fournisseur de messagerie utilisé pour
        recevoir les messages, et — si vous y consentez — le fournisseur de
        mesure d’audience (Google Analytics), dans le respect de contrats ou de
        mécanismes conformes à l’article 28 RGPD le cas échéant.
      </LegalP>
      <LegalP>
        Le formulaire de contact ne repose pas sur un service tiers d’e-mailing
        marketing : l’envoi est effectué vers la boîte professionnelle de
        l’éditeur via une connexion SMTP configurée sur l’hébergement du Site.
      </LegalP>
      <LegalP>
        Aucune vente de données personnelles n’est effectuée. Certains
        traitements peuvent impliquer un transfert vers des pays situés hors de
        l’Espace économique européen (notamment les États-Unis pour
        l’hébergement ou les outils analytiques) ; dans ce cas, des garanties
        appropriées sont mises en œuvre (notamment clauses contractuelles types
        approuvées par la Commission européenne), conformément au chapitre V du
        RGPD.
      </LegalP>

      <LegalH2 id="droits">Vos droits</LegalH2>
      <LegalP>Vous disposez des droits suivants :</LegalP>
      <LegalUl>
        <LegalLi>droit d’accès et de rectification ;</LegalLi>
        <LegalLi>droit à l’effacement (« droit à l’oubli ») ;</LegalLi>
        <LegalLi>droit à la limitation du traitement ;</LegalLi>
        <LegalLi>droit d’opposition, notamment à la prospection ;</LegalLi>
        <LegalLi>droit à la portabilité des données (lorsque applicable) ;</LegalLi>
        <LegalLi>
          droit de retirer votre consentement à tout moment (lorsque le
          traitement est fondé sur le consentement) ;
        </LegalLi>
        <LegalLi>
          droit de définir des directives relatives au sort de vos données
          après votre décès (en France).
        </LegalLi>
      </LegalUl>
      <LegalP>
        Vous pouvez exercer vos droits en écrivant à l’adresse indiquée
        ci-dessus. Une pièce d’identité peut être demandée en cas de doute
        raisonnable sur votre identité. Vous disposez également du droit
        d’introduire une réclamation auprès de la CNIL :{" "}
        <a href={c.cnilComplaintUrl} rel="noopener noreferrer">
          www.cnil.fr
        </a>
        .
      </LegalP>

      <LegalH2 id="securite">Sécurité</LegalH2>
      <LegalP>
        Des mesures techniques et organisationnelles appropriées sont mises en
        œuvre pour protéger les données contre la destruction accidentelle ou
        illicite, la perte, l’altération, la divulgation ou l’accès non autorisé.
      </LegalP>

      <LegalH2 id="mineurs">Mineurs</LegalH2>
      <LegalP>
        Le Site ne s’adresse pas aux mineurs de moins de 15 ans au sens du
        droit français applicable ; aucune collecte intentionnelle de données
        d’enfants n’est réalisée.
      </LegalP>

      <LegalH2 id="modifications">Modifications</LegalH2>
      <LegalP>
        La présente politique peut être mise à jour. La date de dernière
        révision est indiquée ci-dessous. Nous vous invitons à la consulter
        régulièrement.
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
