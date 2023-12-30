import Image from "next/image";
import visit_blog from "@/public/visit-blog.png";
import manage_plans from "@/public/manage-plans.png";
import savings_card from "@/public/savings-card.png";
import know_your_policy from "@/public/know-your-policy.png";
import loyalty_rewards from "@/public/loyalty-rewards.png";

interface IOffers {
	image: string;
	text: string;
	bgColor: string;
}

const offersArray: IOffers[] = [
	{ image: `${manage_plans.src}`, text: "Manage Plans", bgColor: "#fd918d" },
	{ image: `${savings_card.src}`, text: "Savings Card", bgColor: "#42bda5" },
	{
		image: `${know_your_policy.src}`,
		text: "Know Your Policy",
		bgColor: "#099AA8",
	},
	{
		image: `${loyalty_rewards.src}`,
		text: "Loyalty Rewards",
		bgColor: "#649b73",
	},
];

const contactUsStyles = {
	backgroundImage: `url(${visit_blog.src})`,
	backgroundOrigin: "border-box",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	minHeight: "15rem",
	width: "100%",
};

const DashboardMainContent = ({ fullname }: { fullname: string | null }) => {
	return (
		<div className="flex flex-col items-stretch justify-between w-full gap-4">
			<div className="flex flex-col items-start gap-4 min-h-[10rem] md:min-h-[15rem] bg-lightGreen rounded-[1rem] w-full p-5">
				<h2 className="font-bold text-[1.5rem] md:text-[2.5rem] text-blue">
					Welcome, {fullname}
				</h2>
				<div className="bg-grey p-3 rounded-[1rem] w-full max-w-full md:max-w-[60%]">
					<span className="font-normal text-base text-green w-full">
						Have a nice day and don't forget to take care of your health.
					</span>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4 w-full">
				{offersArray.map((offer: IOffers) => (
					<div
						key={offer.text}
						style={{ backgroundColor: `${offer.bgColor}` }}
						className="flex flex-col items-center justify-center gap-3 p-2 w-full max-w-[80%] md:max-w-[12rem] rounded-[1rem] min-h-[12rem]"
					>
						<Image src={offer.image} alt="img" height={50} width={50} />
						<span className="text-white font-normal text-center">
							{offer.text}
						</span>
					</div>
				))}
			</div>

			<div
				style={contactUsStyles}
				className="flex items-end justify-start p-4 rounded-[1rem]"
			>
				<button
					type="button"
					className="min-h-[3rem] w-full max-w-[10rem] bg-pink text-white font-bold text-[1.2rem] rounded-[0.5rem] p-2"
				>
					Visit Our Blog
				</button>
			</div>
		</div>
	);
};

export default DashboardMainContent;
