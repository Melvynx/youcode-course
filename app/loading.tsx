import { Loader } from '@/components/ui/loader';

export default function loading() {
  return (
    <div className="flex size-full items-center justify-center">
      <Loader size={32} />
    </div>
  );
}
