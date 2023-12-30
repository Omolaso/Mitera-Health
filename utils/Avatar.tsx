"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FaUser } from "react-icons/fa";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({
	uid,
	url,
	size,
	fullname,
	onUpload,
}: {
	uid: string;
	fullname: string;
	url: Profiles["avatar_url"];
	size: number;
	onUpload: (url: string) => void;
}) {
	const supabase = createClientComponentClient<Database>();
	const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(url);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		async function downloadImage(path: string) {
			try {
				const { data, error } = await supabase.storage
					.from("avatars")
					.download(path);
				if (error) {
					throw error;
				}

				const url = URL.createObjectURL(data);
				setAvatarUrl(url);
			} catch (error) {
				console.log("Error downloading image: ", error);
			}
		}

		if (url) downloadImage(url);
	}, [url, supabase]);

	const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
		event
	) => {
		try {
			setUploading(true);

			if (!event.target.files || event.target.files.length === 0) {
				throw new Error("You must select an image to upload.");
			}

			const file = event.target.files[0];
			const fileExt = file.name.split(".").pop();
			const filePath = `${uid}-${Math.random()}.${fileExt}`;

			const { error: uploadError } = await supabase.storage
				.from("avatars")
				.upload(filePath, file);

			if (uploadError) {
				throw uploadError;
			}

			onUpload(filePath);
		} catch (error) {
			alert("Error uploading avatar!");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="flex flex-col items-center gap-4 p-3 w-full">
			{avatarUrl ? (
				<Image
					width={size}
					height={size}
					src={avatarUrl}
					alt="Avatar"
					className="rounded-full"
					style={{ height: size, width: size }}
				/>
			) : (
				<div style={{ height: size, width: size }}>
					<FaUser className="h-full w-full" />
				</div>
			)}

			<div className="relative flex flex-col items-center gap-3">
				<span className="text-black text-center font-medium text-[1rem]">
					{fullname}
				</span>
				<label
					className="bg-green p-3 rounded-[0.5rem] cursor-pointer text-white"
					htmlFor="single"
				>
					{uploading ? "Uploading..." : "Upload Photo"}
				</label>

				<input
					className="max-w-[10rem]"
					style={{
						visibility: "hidden",
						position: "absolute",
					}}
					type="file"
					id="single"
					accept="image/*"
					onChange={uploadAvatar}
					disabled={uploading}
				/>
			</div>
		</div>
	);
}
