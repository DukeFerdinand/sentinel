import { toSvg } from 'jdenticon';

interface GeneratedSVGProps {
  str: string;
  size: number;
  className?: string;
}

export const GeneratedSVG: React.FC<GeneratedSVGProps> = ({
  str,
  size,
  className,
}) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: toSvg(str, size) }}
    />
  );
};
