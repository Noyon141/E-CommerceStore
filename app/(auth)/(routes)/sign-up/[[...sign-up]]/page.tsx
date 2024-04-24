import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="">
      <SignUp path="/sign-up" />
    </div>
  );
}
