import { Asset, Password } from "@prisma/client";
import * as CryptoJS from "crypto-js";

export enum CardType {
  AMEX = "Amex",
  VISA = "Visa",
  VISA_CREDIT = "Visa Credit",
  MASTERCARD = "Mastercard",
  MASTERCARD_CREDIT = "Mastercard Credit",
  REWARDS = "Rewards",
  MEMBERSHIP = "Membership",
}

export type AssetCreateUpdateData = Pick<Asset, "name" | "tags" | "assetType">;

export type PasswordCreateData = Pick<
  Password,
  "passwordHash" | "url" | "username" | "email" | "additionalInfo"
>;

export const encryptValue = (password: string, salt: string, value: string) =>
  CryptoJS.AES.encrypt(value, `${salt}${password}`).toString(
    CryptoJS.format.OpenSSL
  );

export const decryptValue = (
  password: string,
  salt: string,
  value: string | undefined | null
) => {
  return value
    ? CryptoJS.AES.decrypt(value, `${salt}${password}`).toString(
        CryptoJS.enc.Utf8
      )
    : "";
};
