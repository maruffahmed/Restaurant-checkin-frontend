import { Card, Image, Text, Group, CardSection } from "@mantine/core";
import classes from "./style.module.css";
import { IRestaurant } from "@/modules/types/restaurant";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: IRestaurant;
}) {
  const cardImage = restaurant.image
    ? restaurant.image
    : "https://placehold.co/600x400";

  return (
    <Card withBorder radius="md" className={classes.card}>
      <CardSection className={classes.imageSection}>
        <Image
          src={cardImage}
          alt="Tesla Model S"
          width={600}
          height={400}
          className="object-cover object-center"
        />
      </CardSection>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>{restaurant.name}</Text>
          <Text fz="xs" c="dimmed">
            {restaurant.address}
          </Text>
        </div>
      </Group>
    </Card>
  );
}
