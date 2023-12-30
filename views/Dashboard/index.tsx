import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import DashboardContent from "@/components/DashboardLayout/DashboardContent";

const DashboardPage = async () => {
	const supabase = createServerComponentClient<Database>({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return <DashboardContent session={session} />;
};

export default DashboardPage;
