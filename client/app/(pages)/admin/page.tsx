import ScrollWrapper from '@/app/features/scroll/ScrollWrapper';
import AdminTabs from '@/app/features/admin/AdminTabs';

export default function Page() {
  return (
    <ScrollWrapper>
      <div className="container px-2 py-3">
        <h1 className="text-3xl font-bold mb-6">Admin API Interface</h1>
        <AdminTabs />
      </div>
    </ScrollWrapper>
  );
}
