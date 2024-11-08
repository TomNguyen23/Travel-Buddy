import DiscoverCategoryCard from "@/components/cards/discover_cards/discover-categoty_card";
import { useSelector } from "react-redux";

const DiscoverCategories = () => {
    const categories = useSelector((state) => state.discover.categories);

    return ( 
        <div>
            {categories.map((category) => (
                <DiscoverCategoryCard key={category.id} navigateTo={`/discover/${category.to}`} props={category} />
            ))}

        </div>
     );
}
 
export default DiscoverCategories;