import { signIn } from "@junobuild/core";
import { FC } from "react";
import { Button } from "./Button";

export const Login: FC = () => {
  const signWithII = async () => {
    await signIn({
      internet_identity: {},
    });
  };

  return <Button onClick={signWithII}>Continue with Internet Identity</Button>;
};
