import RestaurantCard from "@/modules/common/components/restaurant-card";
import axios from "@/modules/lib/axios";
import { IRestaurant } from "@/modules/types/restaurant";
import { SimpleGrid } from "@mantine/core";

const getRestaurants = async (): Promise<IRestaurant[]> => {
  const res = await axios.get("/resturants");
  const restaurants = res.data.data;
  return restaurants;
};

export default async function Home() {
  const restaurants = await getRestaurants();
  return (
    <>
      <h1>Restaurants</h1>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt={16}>
        {restaurants.length ? (
          restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <p className="text-center">No restaurants</p>
        )}
      </SimpleGrid>
    </>
  );
}
