

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { usePathname } from "next/navigation";
import contact_us from "@/public/contact-us.png";
import sidebar_building from "@/public/sidebar-building.png";
import sidebar_card from "@/public/sidebar-card.png";
import sidebar_home from "@/public/sidebar-home.png";
import sidebar_options from "@/public/sidebar-options.png";
import sidebar_support from "@/public/sidebar-support.png";

export interface INavProps {
	name: string;
	path: string;
	icon?: string;
}

export const navLinks: INavProps[] = [
	{
		name: `${logo.src}`,
		path: "/dashboard",
	},
	{
		name: "Home",
		icon: `${sidebar_home.src}`,
		path: "/dashboard",
	},
	{
		name: "Hospital",
		icon: `${sidebar_building.src}`,
		path: "/",
	},
	{
		name: "Cards",
		icon: `${sidebar_card.src}`,
		path: "/",
	},
	{
		name: "Support",
		icon: `${sidebar_support.src}`,
		path: "/",
	},
	{
		name: "More Options",
		icon: `${sidebar_options.src}`,
		path: "/",
	},
];

const contactUsStyles = {
	backgroundImage: `url(${contact_us.src})`,
	backgroundOrigin: "border-box",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	backgroundSize: "contain",
	width: "100%",
};

const DashboardSidebar = () => {
	const pathname: string = usePathname();

	return (
		<nav className="flex flex-col items-center justify-between gap-8 w-full bg-white rounded-[1rem] p-3 min-w-[15rem]">
			<Link
				href={navLinks[0].path}
				className="flex items-center justify-center w-full py-6 max-h-[2.75rem] max-w-[10.6rem]"
			>
				<Image
					src={navLinks[0].name}
					alt="Logo"
					width={100}
					height={100}
					priority
				/>
			</Link>

			<ul className="flex flex-col items-start gap-4 justify-between text-black w-full">
				{navLinks.slice(1, navLinks.length).map((navLink: INavProps) => (
					<li
						key={navLink.name}
						className={
							pathname === navLink.path
								? "flex items-stretch gap-4 w-full min-h-[4rem] bg-lightGreen p-2 rounded-[0.5rem]"
								: "flex items-stretch gap-4 w-full min-h-[4rem] bg-transparent hover:bg-grey p-2 rounded-[0.5rem]"
						}
					>
						<Link
							href={navLink.path}
							className="flex flex-row items-center gap-4 w-full cursor-pointer"
						>
							<Image
								src={navLink.icon!}
								alt="logo"
								width={50}
								height={50}
								priority
							/>
							<span>{navLink.name}</span>
						</Link>
					</li>
				))}
			</ul>

			<Link
				href="/"
				className="flex items-stretch w-full min-h-[15rem] max-h-[20rem]"
			>
				<div style={contactUsStyles} />
			</Link>

			<form action="/auth/signout" method="post">
				<button className="text-royalGreen font-bold" type="submit">
					Sign out
				</button>
			</form>
		</nav>
	);
};

export default DashboardSidebar;
