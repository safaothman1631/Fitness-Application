declare module "@/*";

declare module "speakeasy" {
  export interface GenerateSecretOptions {
    name?: string;
    length?: number;
  }

  export interface GeneratedSecret {
    ascii: string;
    hex: string;
    base32: string;
    otpauth_url?: string;
  }

  export interface TOTPVerifyOptions {
    secret: string;
    encoding: string;
    token: string;
    window?: number;
  }

  export function generateSecret(options?: GenerateSecretOptions): GeneratedSecret;
  export namespace totp {
    export function verify(options: TOTPVerifyOptions): boolean;
  }
}

declare module "qrcode" {
  export function toDataURL(text: string): Promise<string>;
}
