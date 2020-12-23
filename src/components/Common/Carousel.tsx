export interface CarouselProps {
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
  return <div>{children}</div>;
};
