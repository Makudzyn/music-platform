import EmailConfirmation from "@/app/features/auth/EmailConfirmation";

export default function Page({ params }: { params: { token: string } }) {
  return <EmailConfirmation token={params.token}/>
};