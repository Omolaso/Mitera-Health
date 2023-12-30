"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import {
	Session,
	createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import DashboardSidebar from "./DashboardSidebar";
import { RiMenu4Fill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import DashboardMainContent from "./DashboardMainContent";
import DashboardMainContentSidebar from "./DashboardMainContentSidebar";
import { navLinks, INavProps } from "./DashboardSidebar";

const DashboardContent = ({ session }: { session: Session | null }) => {
	const [modal, setModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [fullname, setFullname] = useState<string | null>(null);
	const [username, setUsername] = useState<string | null>(null);
	const [avatar_url, setAvatarUrl] = useState<string | null>(null);
	const supabase = createClientComponentClient<Database>();
	const user = session?.user;
	const router = useRouter();

	const getProfile = useCallback(async () => {
		try {
			setLoading(true);

			const { data, error, status } = await supabase
				.from("profiles")
				.select(`full_name, username, avatar_url`)
				.eq("id", user?.id!)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setFullname(data.full_name);
				setUsername(data.username);
				setAvatarUrl(data.avatar_url);
			}

			if (!data?.full_name) {
				router.push("/register");
			}
		} catch (error) {
			alert("Error loading user data!");
		} finally {
			setLoading(false);
		}
	}, [user, supabase]);

	useEffect(() => {
		getProfile();
	}, [user, getProfile]);

	return (
		<section className="flex items-stretch justify-center min-h-screen bg-grey w-full">
			<div className="relative flex flex-row items-stretch justify-between gap-4 w-full max-w-[100rem] p-4">
				<div className="flex-[0.2] hidden md:flex items-stretch">
					<DashboardSidebar />
				</div>

				<div className="flex-[1] flex flex-col items-start justify-center">
					<div className="flex flex-row gap-4 items-center justify-between bg-transparent border-b border-deepGrey w-full py-4">
						<h1 className=" text-green text-lg font-semibold">Dashboard</h1>

						<button
							type="button"
							onClick={() => setModal(true)}
							className="block md:hidden"
						>
							<RiMenu4Fill className="text-green font-bold w-10 h-10" />
						</button>
					</div>

					<div className=" py-3 flex-1 flex flex-col md:flex-row gap-4 w-full">
						<div className="flex-1 flex items-stretch">
							<DashboardMainContent loading={loading} fullname={fullname} />
						</div>

						<div className="flex-[0.4] flex items-stretch">
							<DashboardMainContentSidebar
								user={user}
								fullname={fullname}
								username={username}
								url={avatar_url}
								setLoading={setLoading}
								setAvatarUrl={setAvatarUrl}
							/>
						</div>
					</div>
				</div>
			</div>

			{/*NAVS MOBILE VIEW */}

			<div
				className={
					modal
						? "fixed z-50 right-0 top-0 h-full bg-lightGreen flex flex-col justify-between flex-[0.3] w-full duration-500 ease-in-out p-4"
						: "fixed z-50 right-[-100%] h-full top-0 bg-lightGreen flex flex-col justify-between flex-[0.3] w-full duration-500 ease-in-out p-4"
				}
			>
				<div className="flex flex-col gap-8">
					<button
						type="button"
						onClick={() => setModal(false)}
						className="self-end"
					>
						<AiOutlineClose className="text-blue font-bold w-8 h-8" />
					</button>
					<ul className="flex flex-col gap-8 text-lg">
						{navLinks.slice(1, navLinks.length).map((navLink: INavProps) => (
							<li key={navLink.name} className="w-full min-h-[2.5rem]">
								<Link
									href={navLink.path}
									onClick={() => setModal(false)}
									className="text-blue font-medium text-lg"
								>
									{navLink.name}
								</Link>
							</li>
						))}
					</ul>
					<form action="/auth/signout" method="post">
						<button
							className="bg-green p-3 rounded-[0.5rem] cursor-pointer text-white"
							type="submit"
						>
							Sign out
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default DashboardContent;
