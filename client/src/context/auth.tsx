import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import type { Profile, Session, User, AuthMutationOutput } from '@server';
import { LocalStorageTokenName } from '../constant';
import { trpc } from '../util/trpc';

type AuthContextType = {
	token?: string;
	profile?: Profile;
	session?: Session;
	user?: User;
	onAuthSuccess: (data: typeof AuthMutationOutput._type) => void;
};

const authContextDefaultValues: AuthContextType = { onAuthSuccess: () => {} };
const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuthContext() {
	return useContext(AuthContext);
}

type Props = {
	children: ReactNode;
};

export function AuthProvider({ children }: Props) {
	const [token, setToken] = useState<string | undefined>();
	const [authData, setAuthData] = useState<{
		profile?: Profile | null;
		session?: Session;
		user?: User;
	}>();
	const value: AuthContextType = {
		...authContextDefaultValues,
		token,
		onAuthSuccess(data) {
			setToken(data.token);
			localStorage.setItem(LocalStorageTokenName, data.token);
			setAuthData((prev) => ({
				...prev,
				profile: data.profile,
				session: data.session,
				user: data.user,
			}));
		},
	};

	useEffect(() => {
		const localStorageToken = localStorage.getItem(LocalStorageTokenName);
		if (localStorageToken) setToken(localStorageToken);
	});
	const verifyAuth = () => {
		if (token) {
			const result = trpc.user.me.useQuery({ profile: true, session: true });
			console.log(result.data);
		}
	};

	return (
		<>
			<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
		</>
	);
}
