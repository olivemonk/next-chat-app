import '@/styles/globals.css'
import { UserProvider } from 'F:/summer23/react/chat-app/context/authContext.js';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
