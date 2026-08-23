export type ProviderClaimStatus = "provider_stated" | "needs_verification" | "verified";

export type PrivateProviderProfileInput = {
  brandName: string;
  providerType: string;
  generalArea: string;
  publicServiceStory: string;
  languages: string[];
  publicLinks: Array<{ label: string; url: string }>;
  publicListingConsent: boolean;
  reviewerApproved: boolean;
  contact: { name: string; email: string; phone: string };
  sales?: string;
  customerCount?: string;
  businessBarriers?: string[];
  reviewerNotes?: string;
  privateFiles?: string[];
  preciseCoordinates?: { latitude: number; longitude: number };
  claims: Array<{ type: string; value: string; status: ProviderClaimStatus; providerApprovedForPublicDisplay: boolean }>;
};

export type PublicProviderProfile = {
  displayName: string;
  providerType: string;
  generalArea: string;
  serviceStory: string;
  languages: string[];
  links: Array<{ label: string; url: string }>;
  verifiedClaims: Array<{ type: string; value: string }>;
};

/**
 * Whitelist projection from a private provider file to a public listing.
 * Private contact, assessment, evidence, reviewer data, and precise location
 * are deliberately absent from both the output type and object construction.
 */
export function projectPublicProviderProfile(input: PrivateProviderProfileInput): PublicProviderProfile | null {
  if (!input.publicListingConsent || !input.reviewerApproved) return null;

  return {
    displayName: input.brandName,
    providerType: input.providerType,
    generalArea: input.generalArea,
    serviceStory: input.publicServiceStory,
    languages: input.languages,
    links: input.publicLinks,
    verifiedClaims: input.claims
      .filter(claim => claim.status === "verified" && claim.providerApprovedForPublicDisplay)
      .map(claim => ({ type: claim.type, value: claim.value })),
  };
}
