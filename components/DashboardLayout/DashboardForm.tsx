"use client";

import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import {
	Session,
	createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

const DashboardForm = ({ session }: { session: Session | null }) => {
	const supabase = createClientComponentClient<Database>();
	const [loading, setLoading] = useState(true);
	const [fullname, setFullname] = useState<string | null>(null);
	const [username, setUsername] = useState<string | null>(null);
	const user = session?.user;
	const router = useRouter();

	const getProfile = useCallback(async () => {
		try {
			setLoading(true);

			const { data, error, status } = await supabase
				.from("profiles")
				.select(`full_name, username`)
				.eq("id", user?.id!)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setFullname(data.full_name);
				setUsername(data.username);
			}
			if (data?.full_name) {
				router.push("/dashboard");
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

	const updateProfile = async ({
		username,
	}: {
		username: string | null;
		fullname: string | null;
	}) => {
		try {
			setLoading(true);

			const { error } = await supabase.from("profiles").upsert({
				id: user?.id as string,
				full_name: fullname,
				username,
				updated_at: new Date().toISOString(),
			});
			if (error) throw error;

			alert("Profile updated!");
			router.push("/dashboard");
		} catch (error) {
			alert("Error updating the data!");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const profileUpdate = () => {
		if (!fullname || !username || !session?.user.email) return;

		updateProfile({ fullname, username });
	};

	return (
		<section className="flex items-center justify-center min-h-screen bg-lightGreen w-full">
			<div className="flex flex-col items-center gap-4 w-full p-4">
				<Link href={"/"}>
					<Image src={logo.src} alt="Logo" width={100} height={100} priority />
				</Link>
				<span className="font-bold text-[1.5rem] md:text-[2.5rem] text-blue">
					Register Your Details Below
				</span>

				<div className="flex flex-col items-start gap-6 w-full max-w-full mx-auto md:max-w-[50%]">
					<div className="flex flex-col gap-1 items-start w-full">
						<label
							htmlFor="email"
							className="font-medium text-[1.5rem] text-blue"
						>
							Email:
						</label>
						<input
							id="email"
							type="text"
							className="min-h-[3rem] p-2 bg-white text-black rounded-[0.5rem] w-full"
							value={session?.user.email}
							disabled
						/>
					</div>

					<div className="flex flex-col gap-1 items-start w-full">
						<label
							htmlFor="fullName"
							className="font-medium text-[1.5rem] text-blue"
						>
							Full Name
						</label>
						<input
							id="fullName"
							type="text"
							value={fullname || ""}
							onChange={(e) => setFullname(e.target.value)}
							className="min-h-[3rem] p-2 bg-white text-black rounded-[0.5rem] w-full"
						/>
					</div>

					<div className="flex flex-col gap-1 items-start w-full">
						<label
							htmlFor="username"
							className="font-medium text-[1.5rem] text-blue"
						>
							Username
						</label>
						<input
							id="username"
							type="text"
							value={username || ""}
							onChange={(e) => setUsername(e.target.value)}
							className="min-h-[3rem] p-2 bg-white text-black rounded-[0.5rem] w-full"
						/>
					</div>

					<div className="flex items-center justify-center w-full">
						<button
							className="min-h-[3rem] p-2 bg-blue text-lightGreen rounded-[0.5rem] w-full"
							onClick={() => profileUpdate()}
							disabled={loading}
						>
							{loading ? "Updating..." : "Update"}
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DashboardForm;
