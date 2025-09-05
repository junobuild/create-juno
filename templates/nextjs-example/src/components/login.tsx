import { Button } from "@/components/button";
import { signIn } from "@junobuild/core";

export const Login = () => {
  const signWithII = async () => {
    await signIn({
      internet_identity: {},
    });
  };

  return <Button onClick={signWithII}>Continue with Internet Identity</Button>;
};
