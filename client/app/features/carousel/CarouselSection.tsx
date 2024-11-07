import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function CarouselSection({
  items,
  renderItem,
  itemsPerGroup = 1,
}) {
  // Function for grouping elements. Used for tracks grouping on home page
  const groupItems = (items: Array<Object>, itemsPerGroup: number) => {
    const groups = [];
    for (let i = 0; i < items.length; i += itemsPerGroup) {
      groups.push(items.slice(i, i + itemsPerGroup));
    }
    return groups;
  };
  //f the parameter 'itemsPerGroup' is not passed we do not group it
  const itemGroups =
    itemsPerGroup > 1 ? groupItems(items, itemsPerGroup) : items;

  return (
    <Carousel
      opts={{ align: 'start', loop: false }}
      className="py-0.5 px-2.5 w-full"
    >
      <CarouselContent className="my-3">
        {itemGroups.map((group, index) => (
          <CarouselItem
            key={index}
            className="pl-5 pr-1.5 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            {itemsPerGroup > 1 ? (
              <div className="grid grid-cols-1 gap-4">
                {group.map((item) => renderItem(item))}
              </div>
            ) : (
              renderItem(group)
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-5 border-none" />
      <CarouselNext className="mr-5 border-none" />
    </Carousel>
  );
}
