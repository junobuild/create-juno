import { Button } from "@/components/button";
import { signIn } from "@junobuild/core";

export const Login = () => {
  const doSignIn = async () => {
    await signIn({
      internet_identity: {},
    });
  };

  return <Button onClick={doSignIn}>Continue with Internet Identity</Button>;
};
