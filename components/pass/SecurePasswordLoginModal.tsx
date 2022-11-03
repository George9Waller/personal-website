import * as bcrypt from "bcryptjs";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";
import { MeData } from "../../pages/api/user/me";
import { useAppContext } from "../context/AppContext";
import Loading from "../common/Loading";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SecurePasswordLoginModal = ({ open, onClose }: Props) => {
  const { setUserSecurePassword, setUserHashSalt, userHashSalt } =
    useAppContext();
  const [password, setPassword] = useState("");
  const [userDetailsLoading, setUserDetailsLoading] = useState(true);

  useEffect(() => {
    open &&
      !userHashSalt.hash &&
      toast
        .promise(axios.get<unknown, { data: MeData }>("/api/user/me"), {
          pending: "Getting user details",
          success: "User details retrieved",
          error: "Failed to get user details",
        })
        .then((response) => {
          setUserHashSalt(
            response.data.secureInfoPasswordHash || "",
            response.data.secureInfoPasswordSalt || ""
          );
          setUserDetailsLoading(false);
        });
  }, [open, userHashSalt, setUserHashSalt]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    password &&
      userHashSalt.salt &&
      bcrypt.hash(password, userHashSalt.salt, (err, hash) => {
        if (hash && hash === userHashSalt.hash) {
          setUserSecurePassword(password);
          toast.success("Password successfully validated");
          onClose();
        } else {
          toast.error("Password does not match");
          setPassword("");
        }
      });
  };

  const setPasswordHash = (e: FormEvent) => {
    e.preventDefault();
    password &&
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if (hash) {
            toast
              .promise(
                axios.post("/api/user/set-secure-password", { hash, salt }),
                {
                  pending: "Setting secure password",
                  success: "Secure password set successfully",
                  error: "Unable to set secure password",
                }
              )
              .then((response) => {
                if (response.status === 200) {
                  setUserSecurePassword(password);
                  onClose();
                }
              });
          } else {
            toast.error("Unable to hash password");
            setPassword("");
          }
        });
      });
  };

  if (userDetailsLoading) {
    return <Loading />;
  }

  if (!userHashSalt?.hash) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="xl">
        <DialogTitle>Set your secure password</DialogTitle>
        <DialogContent>
          <p>
            You need to set a secure password to use this app, once set you must
            remember it as there is no way to access your secure information
            without it
          </p>
          <form onSubmit={setPasswordHash}>
            <TextField
              id="password"
              label="password"
              type="password"
              className="w-full mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn mt-4" type="submit">
              Set
            </button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl">
      <DialogTitle>Login with your secure password</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit} className="mt-2">
          <TextField
            id="password"
            label="password"
            type="password"
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn mt-4" type="submit">
            Login
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
