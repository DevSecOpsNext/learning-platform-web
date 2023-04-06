import { useSession, signIn, signOut } from 'next-auth/react';
import Content from '../../components/content';

export default function SettingsPage() {
  const { data: session } = useSession()

  if(session){
  return <Content title={'Settings - ' + session.user?.name} />;
  }
  return (
    <>
      Not authorised user!
    </>
  )
}
