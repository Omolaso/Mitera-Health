import { Database } from "@/types/supabase";
import {
	User,
	createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Avatar from "@/utils/Avatar";

interface IDeals {
	text: string;
	color: string;
}

const dealsArray: IDeals[] = [
	{
		text: "Electronic Discharge Summary",
		color: "#42bda5",
	},
	{
		text: "Prescriptions",
		color: "#fd918d",
	},
	{
		text: "Appointments",
		color: "#099AA8",
	},
	{
		text: "Health Bills",
		color: "#fcc26b",
	},
];

interface IProps {
	user: User | undefined;
	url: string | null;
	fullname: string | null;
	username: string | null;
	loading: boolean;
	setAvatarUrl: any;
	setLoading: any;
}

const DashboardMainContentSidebar = (props: IProps) => {
	const supabase = createClientComponentClient<Database>();

	const updateProfile = async ({
		username,
		fullname,
		avatar_url,
	}: {
		username: string | null;
		fullname: string | null;
		avatar_url: string | null;
	}) => {
		try {
			props.setLoading(true);

			const { error } = await supabase.from("profiles").upsert({
				id: props.user?.id as string,
				full_name: fullname,
				username,
				avatar_url,
				updated_at: new Date().toISOString(),
			});
			if (error) throw error;
			alert("Profile updated!");
		} catch (error) {
			alert("Error updating the data!");
		} finally {
			props.setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-stretch justify-between gap-4 w-full p-3">
			<Avatar
				uid={props.user?.id!}
				url={props.url}
				fullname={props.fullname!}
				size={150}
				onUpload={(url) => {
					props.setAvatarUrl(url);
					updateProfile({
						fullname: props.fullname,
						username: props.username,
						avatar_url: url,
					});
				}}
			/>

			<div className="flex flex-col items-center justify-center bg-white p-2 w-full rounded-[1rem] min-h-[12rem]">
				<span className="text-pink font-normal text-center text-[5rem]">0</span>
				<span className="text-black fonr-normal text-center">Active plan</span>
			</div>

			<div className="flex flex-col items-start justify-between bg-gradient-to-b gap-3 from-white to-black min-h-[20rem] p-5 md:p-3 rounded-[1rem] w-full">
				{dealsArray.map((deals: IDeals) => (
					<div
						key={deals.color}
						className="flex flex-row items-center gap-2 bg-white rounded-[1rem] w-full p-3"
					>
						<div
							style={{ backgroundColor: `${deals.color}` }}
							className="h-[2rem] w-[2rem] p-3 rounded-full"
						/>
						<span className="text-[1rem] font-semibold text-black">
							{deals.text}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default DashboardMainContentSidebar;
