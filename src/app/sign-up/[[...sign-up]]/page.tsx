import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <SignUp afterSignUpUrl="/news" />
    </div>
  );
}
