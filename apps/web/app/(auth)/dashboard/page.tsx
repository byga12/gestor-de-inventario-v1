import DashBoardPage from './components/content';
import { getSummary } from '@/lib/services/nestjs-api';

export default async function Page() {
  const summary = await getSummary();

  return <DashBoardPage summary={summary} />;
}
