const GetOrigin = () => {
	if (typeof window !== "undefined") {
		return window.location.origin;
	} else {
		// For server-side rendering
		const protocol = process.env.NEXT_PUBLIC_APP_PROTOCOL || "http";
		const hostname = process.env.NEXT_PUBLIC_APP_HOSTNAME || "localhost";
		const port = process.env.NEXT_PUBLIC_APP_PORT || "3000";

		return `${protocol}://${hostname}:${port}`;
	}
};

export default GetOrigin;
