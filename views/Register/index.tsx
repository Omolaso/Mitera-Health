import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import DashboardForm from "@/components/DashboardLayout/DashboardForm";

const RegisterPage = async () => {
	const supabase = createServerComponentClient<Database>({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return <DashboardForm session={session} />;
};

export default RegisterPage;
