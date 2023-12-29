"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import GetOrigin from "@/utils/GetOrigin";

export default function AuthForm() {
	const currentOrigin = GetOrigin();
	const supabase = createClientComponentClient<Database>();

	return (
		<Auth
			supabaseClient={supabase}
			view="magic_link"
			appearance={{ theme: ThemeSupa }}
			theme="dark"
			showLinks={false}
			providers={[]}
			redirectTo={`${currentOrigin}/auth/callback`}
		/>
	);
}
