import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "./firebase";
import firebase from "firebase/app";

export function reauthenticate(password) {
  const user = auth.currentUser;
  const credentials = EmailAuthProvider.credential(user.email, password);
  return reauthenticateWithCredential(user, credentials);
}
