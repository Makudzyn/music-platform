import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@ui/carousel';
import { AnyOfTAP } from "@lib/defenitions";
import { ReactNode } from "react";

interface CarouselSectionProps<T extends AnyOfTAP> {
  items: Array<T>;
  renderItem: (item: T) => ReactNode;
  itemsPerGroup?: number;
}

export default function CarouselSection<T extends AnyOfTAP>({
  items,
  renderItem,
  itemsPerGroup = 1
}: CarouselSectionProps<T>) {
  // Function for grouping elements. Used for tracks grouping on home page
  const groupItems = (items: Array<T>, itemsPerGroup: number) => {
    const groups: Array<T[]> = [];
    for (let i = 0; i < items.length; i += itemsPerGroup) {
      groups.push(items.slice(i, i + itemsPerGroup));
    }
    return groups;
  };
  //if the parameter 'itemsPerGroup' is not passed we do not group it
  const itemGroups =
    itemsPerGroup && itemsPerGroup > 1
      ? groupItems(items, itemsPerGroup)
      : items.map(item => [item]);

  return (
    <Carousel
      opts={{align: 'start', loop: false}}
      className="py-0.5 px-2.5 w-full"
    >
      <CarouselContent className="my-3">
        {itemGroups.map((group, index) => (
          <CarouselItem
            key={index}
            className="pl-5 pr-1.5 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <div className="grid grid-cols-1 gap-4">
              {group.map((item) => renderItem(item))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-5 border-none"/>
      <CarouselNext className="mr-5 border-none"/>
    </Carousel>
  );
}
