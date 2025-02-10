type WebAuthnProviderType = "webauthn";

type ProviderType =
  | "oidc"
  | "oauth"
  | "email"
  | "credentials"
  | WebAuthnProviderType;

type AdapterAccountType = Extract<
  ProviderType,
  "oauth" | "oidc" | "email" | "webauthn"
>;
