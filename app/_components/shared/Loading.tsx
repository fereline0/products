import { Spinner } from "@heroui/spinner";
import { VariantProps } from "@heroui/theme";

type TLoadingProps = {
  spinnerProps?: VariantProps<typeof Spinner>;
};

export default function Loading({ spinnerProps }: TLoadingProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spinner {...spinnerProps} />
    </div>
  );
}
