
import Image, { type ImageProps } from "next/image";

const DoryLogo = (props: Omit<ImageProps, "src" | "alt" | "width" | "height">) => (
  <Image src={`/logo.png`} width={40} height={40} alt="Dory Logo" {...props} />
);
export default DoryLogo;
