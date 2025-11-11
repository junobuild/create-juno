import { Button } from "@/components/button";
import { signIn } from "@junobuild/core";

export const LoginWithII = () => {
  const signWithII = async () => {
    await signIn({
      internet_identity: {},
    });
  };

  return <Button onClick={signWithII}>Continue with Internet Identity</Button>;
};
