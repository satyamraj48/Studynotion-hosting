import { toast } from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { catalogEndpoints } from "../apis";

export const getCatalogPageData = async (categoryId) => {
	const toastId = toast.loading("Loading...");
	let result = [];
	try {
		const response = await apiconnector(
			"POST",
			catalogEndpoints.CATALOGPAGEDATA_API,
			{
				categoryId: categoryId,
			}
		);

		if (!response?.data?.success)
			throw new Error("Could not fetch Category Page Data");

		result = response?.data;
	} catch (error) {
		console.log("CATALOG_PAGE_DATA_API Error......", error);
		toast.error(error.message);
		result = error.response?.data;
	}
	toast.dismiss(toastId);
	return result;
};
