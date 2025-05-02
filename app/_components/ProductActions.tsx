import { Button } from "@heroui/button";
import type { PressEvent } from "@heroui/button";

type TProductActionsProps = {
  onDelete?: (e: PressEvent) => void;
};

export default function ProductActions({ onDelete }: TProductActionsProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {onDelete && (
        <Button variant="solid" color="danger" onPress={onDelete}>
          Delete
        </Button>
      )}
    </div>
  );
}
