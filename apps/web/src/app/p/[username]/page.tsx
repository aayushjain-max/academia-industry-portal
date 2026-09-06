import { redirect } from 'next/navigation';

export default async function ShortProfileRedirect({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  redirect(`/portfolio/${username}`);
}
