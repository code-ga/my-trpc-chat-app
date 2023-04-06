import '@/styles/globals.css';
import { trpc } from '../util/trpc';
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/auth';

export function MyApp({ Component, pageProps }: AppProps) {
	trpc.useContext()
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default trpc.withTRPC(MyApp);
