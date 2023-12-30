"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import login_image from "@/public/login-image.png";
import login_image2 from "@/public/login-image2.png";
import login_image3 from "@/public/login-image3.png";
import login_image4 from "@/public/login-image4.png";
import logo from "@/public/logo.png";

const imagesArr: string[] = [
	`${login_image.src}`,
	`${login_image2.src}`,
	`${login_image3.src}`,
	`${login_image4.src}`,
];

const LoginPage = () => {
	const [currentSlide, setCurrentSlide] = useState<number>(0);

	return (
		<section className="flex items-stretch justify-center min-h-screen w-full">
			<div className="flex flex-col md:flex-row items-center justify-between gap-[1rem] md:gap-[3rem] w-full p-4">
				<div className="self-stretch flex-1 flex flex-col gap-4 items-stretch bg-lightGreen rounded-[0.5rem] p-4">
					<div
						style={{
							backgroundImage: `url(${imagesArr[currentSlide]})`,
							backgroundOrigin: "border-box",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundSize: "contain",
							width: "100%",
						}}
						className="min-h-[15rem] md:min-h-[30rem]"
					/>

					<div className="w-full py-4 border border-t-black border-opacity-90">
						<span className="font-semibold text-[1.5rem] text-black text-opacity-80 text-center md:text-left">
							Mitera Health is Nigeria&apos;s first fully and TRULY digital HMO
							offering comprehensive and affordation Health Insurance plans for
							you and your loved ones.
						</span>
					</div>

					<div className="flex items-center justify-end gap-3 w-full py-4 h-0">
						{imagesArr.map((image: string, index: number) => (
							<button
								key={image}
								type="button"
								onClick={() => setCurrentSlide(index)}
								className={
									currentSlide === index
										? "text-[4rem] text-green"
										: "text-[4rem] text-deepGrey"
								}
							>
								&bull;
							</button>
						))}
					</div>
				</div>

				<div className="flex-[0.7] flex flex-col items-stretch justify-center bg-lightGreen gap-5 p-6 rounded-[0.5rem] min-h-[50vh] md:min-h-[70vh]">
					<Link href={"/"}>
						<Image
							src={logo.src}
							alt="Logo"
							width={100}
							height={100}
							priority
						/>
					</Link>
					<span className="font-semibold text-[1.5rem] text-black text-opacity-80">
						Sign up or Sign in by adding your email address
					</span>
					<AuthForm />
				</div>
			</div>
		</section>
	);
};

export default LoginPage;
